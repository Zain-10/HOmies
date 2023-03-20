# HOmies
This is a web application for a social media network where users can create profiles, log in, add friends with other users and see the number of mutual friends. The purpose of this application is to provide a platform for users to connect with each other.

## Installation
To install this application, follow these steps:

- Clone the repository: `git clone https://github.com/your-username/your-repo.git`
- Install dependencies: `npm install`
- Set up the database:
    - Install MongoDB: https://docs.mongodb.com/manual/installation/
    - Install MongoDB Compass
    - Create a database named "Homies" and collections named "profiles"
- Start the server: `npm start`
- Access the application at `http://localhost:3000`

## Usage
This application allows users to create profiles, log in, and add friends with other users.

To create a profile, click the "Create Account" button on the login page. Fill out the form and click "Submit". Once you have created a profile, you need to log in and redirected to your profile page.

To log in,enter your email address and password and click "Submit". Once you have logged in, you will be redirected to your profile page and the session will be stored in cookies for some minutes.

To add a friend, click the "Add Friend" button on the Pick Your Friend section. The profile will be added to your friend list.

To see the number of mutual friends click one profile card.

## Technologies Used
  1. Node.js
  2. Express.js
  3. MongoDB
  4. Bootstrap
  5. EJS (Embedded JavaScript)
  
## Limitations
- Didn't used any frontend framework like react or nextjs which made difficult for some features like perfect searching users.(as I was learning backend as express)
- Time limitations - didn't worked more on UI and responsiveness, can't add other features

## Demo Video
Link : https://drive.google.com/file/d/11JxaapheoZovH9tVjxdknI9FOJWBAPUF/view?usp=share_link
