<h1 align="center">Uber</h1>
<h3 align="center">This is a clone version of the original Uber</h3>
<h4 align="center">This application will allow users to book a ride with ease with added cool features</h3>


<h2 align="left">Tech Stack and Tools :</h2>
<p align="left">
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="80" height="80"/> </a>
<a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="80" height="80"/> </a>
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="80" height="80"/> </a>
<a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="80" height="80"/> </a>
  
<a href="https://ik.imagekit.io/ably/ghost/prod/2021/03/socket-io-logo-1.jpeg?tr=w-1728,q-50" target="_blank" rel="noreferrer"> <img src="https://ik.imagekit.io/ably/ghost/prod/2021/03/socket-io-logo-1.jpeg?tr=w-1728,q-50" alt="socketio" width="80" height="80"/> </a>
<a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTau7e3U7jG_C7Jpcx4Ezf0NCQFAGR5oeQTpw&s" target="_blank" rel="noreferrer"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTau7e3U7jG_C7Jpcx4Ezf0NCQFAGR5oeQTpw&s" alt="googlemapsAPI" width="80" height="80"/> </a>
<a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="80" height="80"/> </a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="80" height="80"/> </a>
<a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="80" height="80"/> </a>
<a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7gp2mNb-Vexc_KMgTBffmmXhkR0yqVS5F6w&s" target="_blank" rel="noreferrer"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7gp2mNb-Vexc_KMgTBffmmXhkR0yqVS5F6w&s" alt="git" width="80" height="80"/> </a>
<a href="https://cdn.prod.website-files.com/67053868fc01e494462e71c9/670d4874817428bdb8b85387_6582afc14d6b07048d216746_gsap-logo.svg" target="_blank" rel="noreferrer"> <img src="https://cdn.prod.website-files.com/67053868fc01e494462e71c9/670d4874817428bdb8b85387_6582afc14d6b07048d216746_gsap-logo.svg" alt="git" width="80" height="80"/> </a>
<a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="80" height="80"/> </a>

</p>

<h2 align="left">Features</h2>

<h3 align="left">Multiple Dashboards</h3>

<h3 align="left">User : </h3> 

- Utilized **JWT** for user's Signin/Signup
  
- Integrated **google maps API** seemlessly where users can find their desired location using the search bar

- Integrated **socket.io** for seemless real-time communication between User and Captain

- Additionally, the option of **'use current location'** is added such that, the users current location's suggestions get displayed

- User can also explore multiple ride options such as car and bike which **a reasonable pricing formula**

- Finally users can book a ride and confirm the ride with captain using **OTP**

- Utilized **express-validator middleware** to validate the inputs coming from the client instead of manually defining them

<h3 align="left">Captain : </h3>

- Captain can also Signin/Signup giving all the necessary details such as vehicle details, personal information **(**implemented using JWT**)**

- Captain should wait for the ride and should be present in a radius of 5 miles to get the ride from the User

- Captain can accept and confirm the ride **using the OTP** mentioned by the User

- Implemented interactive Cool-UI using **useGSAP()** hook in **ReactJS**, integrated seemlessly with **GoogleMaps API**

- Utilized **Socket.io** to send real-time updates to user such as ride confirmation etc.

- Current location gets fetched and gets updated for every few seconds in the database

- Utilized **MongoDB database** for effectively storing the data (Captain, User, rides etc.)

<h2 align="left">Website Video</h2>

- Presented here is a brief overview video of the website, providing insights into its some of the functionalities and design.

- Please take a moment to watch and gain an understanding of the platform's offerings.

https://github.com/user-attachments/assets/9e9d792a-3867-49e6-8140-b7046f5d7b65

<h2 align="left">Installation</h2>
<h3 align="center">To get started with this project, clone the repository or download the zip file</h3>
<h4 align="center">Install the necessary dependencies</h4>

```bash
# Clone the repository
git clone https://github.com/Rupesh2728/Uber.git

# Navigate to the project directory
cd Uber

## Navigate to Frontend
cd Frontend
npm i
npm run dev

## Navigate to Backend
cd Backend
npm i
nodemon server.js
```

<h2 align="left">Contact Us</h2>

- 📫 You can to reach us by mailing to **rupeshprofessional2728@gmail.com** or **rupeshp2809@gmail.com**

- 👨‍💻 Project is available at [https://github.com/Rupesh2728/Uber.git]
  






