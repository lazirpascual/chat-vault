# Chat Vault

<img src="https://i.imgur.com/SygPdPQ.gif" width="70%" height="500"/>

## Live Demo of [Chat Vault](https://chatvault.netlify.app/)

This is a fullstack MERN application that models a social media website. Includes a Realtime Chat Feature built using Socket.IO library. Made using Javascript, React JS, Node JS, Express, MongoDB, and Material-UI. <br />

## 🔗 Backend [Repo](https://github.com/lazirpascual/chat-vault-backend)

## 🛠 Tech Stack

| <img src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/javascript.svg" width="40"> | <img src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/react.svg" width="40"> | <img src="https://cdn.jsdelivr.net/npm/simple-icons@4.25.0/icons/node-dot-js.svg" width="40"> | <img src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/express.svg" width="40"> | <img src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/mongodb.svg" width="40"> | <img src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/material-ui.svg" width="40"> |
| :--------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |

- **Front-End**: Javascript, React (Context API), Material-UI </br>
- **Back-End**: NodeJS, Express, Socket.IO </br>
- **Database**: MongoDB </br>
- **Deployment**: Heroku (backend), Netlify (frontend), MongoDB Atlas

## ⚙️ Features

- User registration/login authenticated through JSON Web Token
- Realtime Chat implemented using Socket.IO
  - Start or delete a chat with another user
- Create, delete, update a post in the home page or profile page
- Like/dislike and add/delete comments for each post
- Follow or unfollow a user to view their content
- Search for a user's profile or a user's post
- Update personal information (bio, city, status, etc.) and change or upload profile/cover pictures

# Development Process

- **Adding a Backend** <br />
  I started this project off by building the backend portion of my application. As I was still trying to gain proficiency with the MERN stack, I used Node.JS and Express to build the backend and MongoDB for the database. First, I created a USERS model & route that serves a REST API to be used for updating, deleting, following, and unfollowing a user. Afterwards, I created an AUTH model & route that is used for authenticating (login) and creating (register) a user account. Finally, I added a POSTS model & route that is used to create, update, delete and retreive a post from the home page or a user's profile page.
- **Adding a Frontend** <br />
  After initially building my application with a backend, I decided to build a frontend. For this, I used React JS and plain CSS to style and design my application while minimally using Material-UI to import some icons. I created the components and pages that would implement the features that I created for the backend such as the homepage, profile page, register page, and login page.
- **Connecting the Frontend to the Backend** <br />
  With both of the frontend and backend portion of my application in place, it was time to connect them together. I used Axios to consume the backend's REST APIs to populate the pages of my application with the appropriate data. Furthermore, I used Context API to globally manage the appliction's state, where I created an Auth Context, Auth Reducer, and Auth Actions, all of which are used to authenticate a user's account and give them access to different parts of the application.
- **Creating a Realtime Chat Feature** <br />
  After building a majority of the application, I implented a feature that would allow authenticated users to communicate and talk to each other in realtime. To accomplish this, I built two additional backend models & routes; CONVERSATIONS and MESSAGES. The conversations route allows the application to fetch a conversation between two users and allows a user to start their own conversation. The messages route then displays all the messages of a conversation and allows the user to send messages to another user. Finally, I used Socket.IO to create a websocket server on the backend. This allowed the chat feature of my application to have realtime data flow, where the conversation between two users are instantaneously updated without having to make asynchronous requests.

# Screenshots

## 1. Home Page

![preview](https://i.imgur.com/ys9L0sB.jpg)

## 2. Profile Page

![preview](https://i.imgur.com/WZTInMO.jpg)

## 3. Messenger Page

![preview](https://i.imgur.com/fp3K4JG.jpg)

## 4. Login Page

![preview](https://i.imgur.com/eJvKEP5.jpg)

## 5. Register Page

![preview](https://i.imgur.com/M2rkxgg.jpg)
