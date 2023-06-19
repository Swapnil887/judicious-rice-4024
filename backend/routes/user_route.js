require('dotenv').config();
const express = require('express');
const path = require('path');
const passport = require('passport');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars')
const bcrypt = require('bcrypt');
const fs = require('fs')
const userrouter = express.Router()

const cors = require('cors');
const { usermodel } = require('../models/usermodel');
const { outhuser } = require('../models/outh');
const { LawyerModel } = require('../models/lawyerModel');
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

userrouter.post('/forgotpassword', (req, res) => {
  let { email } = req.body
  console.log(email);
  const directory = path.join(__dirname, "..", "verifypassword.html");
  const fileRead = fs.readFileSync(directory, "utf-8");
  const template = handlebars.compile(fileRead);
  const htmlToSend = template({ email });
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
      res.json("Email Sent")
    }
  });
});

userrouter.get("/newpasswordreset/:email", async (req, res) => {
  let email = req.params.email
  console.log(email);

  const userData = JSON.stringify(email);

  // Encode the serialized JSON as a URL-safe string
  const encodedData = encodeURIComponent(userData);

  res.redirect(`http://127.0.0.1:5500/frontend/confirmpassword.html?user=${encodedData}`);
})

userrouter.post("/confirmpassword", async (req, res) => {
  let { email, password } = req.body
  if (email && password) {
    let user = await usermodel.findOne({ email })
    console.log(user);
    if (user == null) res.json("Not Found")
    else {
      let hash = bcrypt.hashSync(password, 10)
      await usermodel.findOneAndUpdate({ email }, { password: hash })
      res.json("Reset Successful")
    }
  } else {
    res.json("error in resseting")
  }
})

userrouter.get('/status/:email', async (req, res) => {
  let email = req.params.email
  console.log(email);
  await usermodel.findOneAndUpdate({ email }, { status: true })
  const userData = JSON.stringify(email);

  // Encode the serialized JSON as a URL-safe string
  const encodedData = encodeURIComponent(userData);

  res.redirect(`http://127.0.0.1:5501/frontend/login.html?user=${encodedData}`)
});

userrouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

userrouter.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  async function (req, res) {
    // Successful authentication, send user's data to the frontend
    let email = req.user._json.email
    let user = await outhuser.findOne({ email })
    if (user != null) {
      const userData = JSON.stringify(user);

      // Encode the serialized JSON as a URL-safe string
      const encodedData = encodeURIComponent(userData);

      res.redirect(`http://127.0.0.1:5501/frontend/index.html?user=${encodedData}`);

    } else {
      let obj = {
        email
      }
      let user = new outhuser(obj)
      await user.save()
      let userfromdb = await outhuser.findOne({ email })
      const userData = JSON.stringify(userfromdb);
      const encodedData = encodeURIComponent(userData);
      res.redirect(`http://127.0.0.1:5501/frontend/index.html?user=${encodedData}`);
    }
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
  let { name, email, password } = req.body
  let userexists = await usermodel.findOne({ email })

  if (userexists !== null) res.json("exists");
  else {
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
          password: hash
        }
        let user = new usermodel(obj)
        await user.save()
        res.json("Email Sent")
      }
    });
  }
});

userrouter.post("/login", async (req, res) => {
  let { email, password } = req.body
  let user = await usermodel.findOne({ email })
  // let lawyer = await LawyerModel.contact.findOne({ email })
  let lawyer = await LawyerModel.findOne({ 'contact.email': email}).exec();
console.log(user,lawyer,email,password);
  if (user == null && lawyer == null) res.json("NotFound")
  else if (user) {
    if (user.status == false) res.json("Confirm your Account")
    else {
      let hash = bcrypt.compareSync(password, user.password)
      if (hash) {
        res.json(user)
      } else {
        res.json("Incorrect Password")
      }
    }
  }else if(lawyer){
    if(lawyer.contact.password==password)res.json(lawyer)
    else res.json("Incorrect Password")
  }
})

module.exports = {
  userrouter
}