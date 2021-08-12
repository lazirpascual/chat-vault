# Chat Vault

This is a fullstack MERN application that models a social media website. Includes a Realtime Chat Feature built using Socket.io library. Made using Javascript, React JS, Node JS, Express, MongoDB, and Material-UI. <br />

## 🔗 Live Demo of [Chat Vault](https://chatvault.herokuapp.com/)

## ⫸ Backend [Repo](https://github.com/lazirpascual/chat-vault-backend) | Socket.IO [Repo](https://github.com/lazirpascual/chat-vault-socket.io)

## 🛠 Tech Stack

| <img src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/javascript.svg" width="40"> | <img src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/react.svg" width="40"> | <img src="https://cdn.jsdelivr.net/npm/simple-icons@4.25.0/icons/node-dot-js.svg" width="40"> | <img src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/express.svg" width="40"> | <img src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/mongodb.svg" width="40"> | <img src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/material-ui.svg" width="40"> |
| :--------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |

- **Front-End**: Javascript, React (Routers & Context API), Material-UI </br>
- **Back-End**: NodeJS, Express, Socket.IO </br>
- **Database**: MongoDB </br>
- **Deployment**: Heroku (backend), Netlify (frontend), MongoDB Atlas

## ⚙️ Features

- User registration/login authenticated through JSON Web Token
- Realtime Chat with authenticated users implemented using Socket.IO
- Create, delete, update, like/dislike a post in the home page or profile page
- Follow or unfollow a user
- Keep track of a user's information (friends, posts, hometown, etc.) by navigating to their profile page

# Development Process

- **Adding a Backend** <br />
  I started this project off by building the backend portion of my application. As I was still trying to gain proficiency with the MERN stack, I used Node.JS and Express to build my backend and MongoDB for my database. First, I created a USERS model & route that serves a REST API to be used for updating, deleting, following, and unfollowing a user. Afterwards, I created an AUTH model & route that is used for authenticating (login) and creating (register) a user account. Finally, I added a POSTS model & route that is used to create, update, delete and retreive a post from the home page or a user's profile page.
- **Adding a Front-End** <br />
  After initially building my application with a backend, I decided to build a frontend. For this, I used React JS and plain CSS to style and design my application while minimally using Material-UI to import some icons. I created the components and pages that would implement the features that I created for the backend such as the homepage, profile page, register page, and login page.

# Screenshots

## 1. Home Page

![preview](https://i.imgur.com/mmY5ii9.jpg)

## 2. Profile Page

![preview](https://i.imgur.com/d14rGob.jpg)

## 3. Login Page

![preview](https://i.imgur.com/OnKz4D9.jpg)

## 4. Register Page

![preview](https://i.imgur.com/0dPLz5B.jpg)
