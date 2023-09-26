# upSkill - A Learning Platform 🚀

**Description:**
upSkill is a social learning platform designed to connect tech enthusiasts, fostering collaborative learning within specialized communities. Users can join communities, post questions, and access a curated list of courses for interactive education.

**Technologies Used:**
- **Frontend:**
  - React, Redux Toolkit, HTML, CSS, JavaScript.
- **Backend:**
  - Node.js, Express.js, MongoDB.
- **Image Handling:**
  - Cloudinary for efficient image upload and rendering.


**Project Highlights:**
- Optimized image loading for improved performance (30x speed enhancement).
- Implemented debouncing in search to reduce unnecessary API calls by 70%.
- Utilized JSON Web Tokens (JWT) for secure authentication and authorization.
- Developed over 25 RESTful APIs to support various features.
- Implemented dark and light mode support for enhanced user experience.

### Screenshots

  **Home Page:**
  ![Screenshot 1](https://res.cloudinary.com/dgx585ycj/image/upload/v1695710058/learninguploads/xx2khkur25tipvdjeotw.png)


  **Users:**
  ![Screenshot 1](https://res.cloudinary.com/dgx585ycj/image/upload/v1695710061/learninguploads/f5kspp2oau3qvb0xmish.png)


  **Courses:**
  ![Screenshot 1](https://res.cloudinary.com/dgx585ycj/image/upload/v1695710061/learninguploads/wtcfrfvtx24uyyoqhx1g.png)


  **User Profile:**
  ![Screenshot 1](https://res.cloudinary.com/dgx585ycj/image/upload/v1695710061/learninguploads/ixzlfrdsofsb29hk0bwq.png)


  **Create Post:**
  ![Screenshot 1](https://res.cloudinary.com/dgx585ycj/image/upload/v1695710060/learninguploads/ocxw7vc5tm5gu0clqvgt.png)


## How to Run

1. Clone this repository.
2. Navigate to the project directory: `cd upSkill`.
3. **Client (Frontend):**
    - Navigate to the client directory: `cd client`.
    - Install frontend dependencies: `npm install`.
    -  Create a `.env` file in the `client` directory and add your frontend environment variables.
       ```plaintext
       REACT_APP_SERVER=http://localhost:xxxx
    - Run the frontend: `npm start`.
4. **Server (Backend):**
    - Navigate to the server directory: `cd server`.
    - Install backend dependencies: `npm install`.
    - Create a `.env` file in the `server` directory and add your backend environment variables.
       ```plaintext
      MONGO_URL=mongodb+srv://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      PORT=xxxx
      JWT_SECRET=xxxxxxxxxxx
      CLOUD_NAME=xxxxxxxxxxx
      CLOUD_API=xxxxxxxxxxxxxxxx
      CLOUD_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxx
    - Start the backend server: `node index.js`.
  
**Contributing:**
Contributions are welcome! Fork this project, make your changes, and submit a pull request. 🛠️

