require('dotenv').config();
const express = require('express');
const path = require('path');
const passport = require('passport');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars')
const bcrypt = require('bcrypt');
const fs = require('fs')
const userrouter=express.Router()

const cors = require('cors');
const { usermodel } = require('../models/usermodel');
userrouter.use(cors());

// Set up your GoogleStrategy here

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleclientid,
      clientSecret: process.env.googlesecret,
      callbackURL: 'http://localhost:8080/user/auth/google/callback',
      profileFields: ['id', 'displayName', 'picture', 'email'],
    },
    function (accessToken, refreshToken, profile, done) {
      // You can access the user's data from the `profile` object
      //   console.log(profile);
      return done(null, profile);
    }
  )
);

// Set up your routes

userrouter.get('/', (req, res) => {
  res.send('Hello, World!');
});

userrouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

userrouter.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function (req, res) {
    // Successful authentication, send user's data to the frontend
    const userData = JSON.stringify(req.user);

    // Encode the serialized JSON as a URL-safe string
    const encodedData = encodeURIComponent(userData);

    res.redirect(`http://127.0.0.1:5500/frontend/userdetails.html?user=${encodedData}`);

  }
);

// Set up your Nodemailer configuration

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

// Add your signup route

userrouter.post('/signup', async (req, res) => {
  console.log(req.body);
  let { name, email, password, role } = req.body
  let userexists = await usermodel.findOne({ email })

  if (userexists !== null) res.json("exists");
  else{
    const directory = path.join(__dirname, "..", "verify.html");
    console.log(directory)
    const fileRead = fs.readFileSync(directory, "utf-8");
    const template = handlebars.compile(fileRead);
    const htmlToSend = template({ name, email });
    let mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Verify Account",
      html: htmlToSend,
    };
    transporter.sendMail(mailOptions, async (err, info) => {
      if (err) {
        console.log(err);
        res.json("Invalid Email")
      } else {
        console.log(info);
        let hash = bcrypt.hashSync(password, 10)
        let obj = {
          name,
          email,
          password: hash,
          role: "client",
          status: false
        }
        let user = new usermodel(obj)
        await user.save()
        res.json("Email Sent")
      }
    });
  }
});
module.exports={
    userrouter
}