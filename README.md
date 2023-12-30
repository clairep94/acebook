# Acebook - Facebook Clone

Acebook is a Facebook clone project, showcasing use of the MERN stack, Socket.io and Tailwind, created at Makers Academy.
This version is a personal extension of [Acebook Team Griffins](https://github.com/clairep94/acebook-team-griffins). It adds real-time messaging and notifications through the use of websockets, as well as modern component design through Tailwind CSS.

Users can sign up, log in, create posts with images and/or text, interact with posts, add friends, send messages, and receive real-time notifications.

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