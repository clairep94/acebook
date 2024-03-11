# Acebook - Facebook Clone

Acebook is a Facebook clone project, showcasing use of the MERN stack, Socket.io and Tailwind, created at Makers Academy. <br/>
This version is a **WIP personal extension of [Acebook Team Griffins](https://github.com/clairep94/acebook-team-griffins)** with a focus on demonstrating modern UI principles and FE methods. <br/>
It adds real-time messaging and notifications through the use of websockets, as well as modern component design through Tailwind CSS.

Users can sign up, log in, create posts with images and/or text, interact with posts, add friends, send messages, and receive real-time notifications.
All UI designs are responsive and aim to follow Facebook's early 2024 UI 1-to-1.

## Screenshots:

### ✅ Landing Page:
![Screenshot 2024-01-06 at 21 51 06 (1)](https://github.com/clairep94/acebook/assets/128436909/9e6d4f1d-3115-491f-8e1b-7fa1d38f7d74)

![Screenshot 2024-01-06 at 21 51 10](https://github.com/clairep94/acebook/assets/128436909/cba523c5-0be1-49c9-96c2-d73adb737b56)


### ✅ Navbar with Live Searchbar:

![Screenshot 2024-01-06 at 21 51 23](https://github.com/clairep94/acebook/assets/128436909/e9f9ff91-c41a-4a1f-95e5-be6e14b3180f)

![Screenshot 2024-01-06 at 21 51 30](https://github.com/clairep94/acebook/assets/128436909/07c78e19-cbba-4ddb-ae77-5c65f262c684)

### ✅ Friends & Friend Requests Page:

<img width="1552" alt="Screenshot 2024-01-07 at 20 59 03" src="https://github.com/clairep94/acebook/assets/128436909/75270f9f-3655-4095-8bdd-3f905b756126">

<img width="1552" alt="Screenshot 2024-01-07 at 20 59 08" src="https://github.com/clairep94/acebook/assets/128436909/b6b43412-e125-4250-adb2-2005bd4746b8">


### User Page - WIP:

<img width="1552" alt="Screenshot 2024-01-07 at 11 04 21" src="https://github.com/clairep94/acebook/assets/128436909/6178f17b-fe46-4be5-bbf5-8523bf9fdbcd">


<hr/>

## Installing Project Dependencies:

### Node.js
1. Install Node Version Manager (nvm)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), currently `18.1.0`.
   ```
   nvm install 18
   ```

### MongoDB
1. Install MongoDB
   ```
   brew tap mongodb/brew
   brew install mongodb-community@5.0
   ```
   *Note:* If you see a message that says `If you need to have mongodb-community@5.0 first in your PATH, run:`, follow the instruction. Restart your terminal after this.
2. Start MongoDB
   ```
   brew services start mongodb-community@5.0
   ```

### Project Dependencies

1. npm install in the three main folders:

   ``` shell
   ; cd api
   ; npm install
   ; cd ../frontend
   ; npm install
   ; cd ../socket
   ; npm install
   ```

2. Add Cloudinary account API credentials

This project uses Cloudinary for media storage. 
Add a `.env` file to your root folder and add the following variables (replacing the values with your Cloudinary account API credentials)
  
  ``` shell
  ; CLOUDINARY_CLOUD_NAME=your_cloud_name
  ; CLOUDINARY_API_KEY=your_api_key
  ; CLOUDINARY_API_SECRET=your_api_secret
  ```



# Running the App:

1. Start the server application (in the `api` directory)

   ```shell
   ; cd api
   ; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm start
   ```

2. Start the front end application (in the `frontend` directory)

  In a new terminal session...

  ```shell
  ; cd frontend
  ; npm start
  ```

You should now be able to open your browser and go to `http://localhost:3000/`

3. Start the socket (in the `socket` directory)

   In a new terminal session...

```shell
; cd socket
; npm start
```


<!--
# How to run automated tests

The automated tests run by sending actual HTTP requests to the API. Therefore, before anything, you'll need to start the backend server in test mode (so that it connects to the test DB).

**Note the use of an environment variable for the JWT secret**

```bash
# Make sure you're in the api directory
; cd api

; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm run start:test
```

You should leave this running in a terminal.

Then, you can either run tests for the backend or the frontend following the steps below. 

#### Running tests for the backend

Run the tests in a new terminal session:

```bash
# Make sure you're in the api directory
; cd api

; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm run test
```

####  Running tests for the frontend

Start the front end in a new terminal session

```bash
# Make sure you're in the frontend directory
; cd frontend

; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm start
```

Then run the tests in a new terminal session

```bash
# Make sure you're in the frontend directory
; cd frontend

; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm run test
```
-->
