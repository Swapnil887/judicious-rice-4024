# Legit Lawyer
# Lawyer Booking Appointment System with Video Call Function

This system allows users to book appointments with lawyers and have video calls with them using websockets and WebRTC technology. The project is built using Node.js, MongoDB, Express, and incorporates Google OAuth for user authentication and Nodemailer for email notifications.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The Lawyer Booking Appointment System aims to provide a platform for users to easily book appointments with lawyers and have video calls with them remotely. The system uses websockets and WebRTC technology to enable real-time video communication between users and lawyers.

Key components of the system include:

- User registration and authentication using Google OAuth
- Lawyer profile management
- Appointment booking system
- Real-time video calls using websockets and WebRTC
- Email notifications using Nodemailer

## Features

1. **User Registration and Authentication**: Users can sign up and log into the system using their Google accounts. This ensures secure and convenient authentication.

2. **Lawyer Profile Management**: Lawyers can create and manage their profiles, providing information such as their specialization, experience, and availability. Users can view lawyer profiles to make informed decisions when booking appointments.

3. **Appointment Booking**: Users can search for lawyers based on specialization, availability, and location. They can view lawyer profiles, check their availability, and book appointments at suitable time slots.

4. **Real-time Video Calls**: Once an appointment is booked, users and lawyers can have real-time video calls using websockets and WebRTC technology. This enables seamless communication between both parties, enhancing the remote consultation experience.

5. **Email Notifications**: Users receive email notifications for appointment confirmation, reminders, and any updates or changes to their appointments. Nodemailer is used to send these email notifications.

## Tech Stack

The project is built using the following technologies:

- **Node.js**: A JavaScript runtime environment used for server-side development.
- **MongoDB**: A NoSQL database used for storing user and lawyer data, appointment information, and other relevant data.
- **Express**: A web application framework for Node.js used to build the server-side application and RESTful APIs.
- **Google OAuth**: A secure and widely-used authentication mechanism that allows users to sign up and log into the system using their Google accounts.
- **Websockets**: A communication protocol that enables real-time bidirectional communication between clients and servers.
- **WebRTC**: A web-based technology that allows real-time communication, including video and audio streaming, between web browsers.
- **Nodemailer**: A module for Node.js used to send email notifications to users.

## Setup

To set up and run the Lawyer Booking Appointment System on your local machine, please follow these steps:

1. Clone the project repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd lawyer-booking-system
   ```

3. Install the project dependencies:

   ```
   npm install
   ```

4. Set up the MongoDB database. Make sure you have MongoDB installed and running locally.

5. Create a `.env` file in the project root directory and configure the following environment variables:

   ```
   MONGODB_URI=<your-mongodb-uri>
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   SMTP_HOST=<your-smtp-host>
   SMTP_PORT=<your-smtp-port>
   SMTP_USER=<your-smtp

-username>
   SMTP_PASS=<your-smtp-password>
   ```

   Replace `<your-mongodb-uri>`, `<your-google-client-id>`, `<your-google-client-secret>`, `<your-smtp-host>`, `<your-smtp-port>`, `<your-smtp-username>`, and `<your-smtp-password>` with your own values.

6. Run the application:

   ```
   npm start
   ```

   The server will start running on `http://localhost:3000`.
  ```

## Usage

Once the server is up and running, you can access the Lawyer Booking Appointment System using a web browser.

1. Open your preferred web browser and navigate to `http://localhost:3000`.

2. Sign up or log into the system using your Google account.

3. Explore the available lawyers and their profiles.

4. Book an appointment with a lawyer of your choice.

5. Prior to the appointment time, make sure you have a compatible web browser that supports WebRTC technology (e.g., Chrome, Firefox).

6. At the scheduled appointment time, join the video call by clicking on the provided link or button.

7. Enjoy your remote consultation with the lawyer using the real-time video call feature.

## Contributing

We welcome contributions to enhance the Lawyer Booking Appointment System. If you would like to contribute, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix.

3. Make the necessary changes and commit them.

4. Push your changes to your forked repository.

5. Submit a pull request, describing your changes in detail and mentioning the problem or feature you addressed.

We appreciate your valuable contributions to the project!

## License

The Lawyer Booking Appointment System is open source and distributed under the [MIT License](LICENSE) Feel free to modify and use the system according to your needs.
