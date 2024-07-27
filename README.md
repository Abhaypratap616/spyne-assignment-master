# SPYNE AI Assignment Solution

This repository contains the solution for the SPYNE AI assignment. The project is structured to handle user discussions, including features like comments, likes, and user authentication. Below is an overview of the folder structure and the purpose of each file.

## Folder Structure

```plaintext
SPYNE_AI_ASSIGNMENT_SOLUTION
├── node_modules
├── src
│   ├── config
│   │   ├── db.js
│   │   ├── multer.js
│   │   └── s3Bucket.js
│   ├── controllers
│   │   ├── discussion
│   │   │   ├── comment.js
│   │   │   ├── discussion.js
│   │   │   ├── like.js
│   │   │   └── modifyDiscussion.js
│   │   ├── user
│   │   │   ├── followUser.js
│   │   │   ├── getUser.js
│   │   │   └── modifyUser.js
│   │   ├── auth.js
│   ├── middlewares
│   │   └── auth.js
│   ├── models
│   │   ├── Comment.js
│   │   ├── Discussion.js
│   │   ├── Like.js
│   │   ├── LikeOnComment.js
│   │   ├── ReplyOnComment.js
│   │   └── User.js
│   ├── routes
│   │   ├── discussion
│   │   │   ├── index.js
│   │   │   ├── privateRoutes.js
│   │   │   ├── publicRoutes.js
│   │   ├── user
│   │   │   ├── index.js
│   │   │   ├── privateRoutes.js
│   │   │   ├── publicRoutes.js
│   │   ├── auth.js
│   │   ├── index.js
│   ├── services
│   │   ├── s3bucket.js
│   ├── utils
│   │   ├── response.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js
- npm (Node Package Manager)

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/YbiG-blog/spyne-assignment.git
    ```
2. Navigate to the project directory:
    ```sh
    cd SPYNE_AI_ASSIGNMENT_SOLUTION
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
### Configuration
1. Create a `.env` file in the root directory and add your environment variables. For example:
    ```env
    DB_URL=your-database-connection-string
    TOKEN_SECRET_KEY=secret-key-for-jsonwetoken
    AWS_S3_CREDENTIALS_ACCESS_KEY=your-aws-access-key-id
    AWS_S3_CREDENTIALS_SECRET_KEY=your-aws-secret-access-key
    S3_REGION
    NODE_ENV
    STORAGE_BUCKET_NAME

    ```

### Running the Application
1. Start the development server:
    ```sh
    npm start
    ```

# Project Overview

## src/config
This directory contains configuration files.

- **db.js**: Configuration for the database connection.
- **multer.js**: Configuration for handling file uploads using Multer.
- **s3Bucket.js**: Configuration for connecting and interacting with AWS S3.

## src/controllers
This directory contains the controller files for handling the business logic of the application.

### Discussion Controllers
- **comment.js**: Manages actions related to comments on discussions and reply on comments.
- **discussion.js**: Manages actions related to discussions.
- **like.js**: Manages actions related to likes on discussions and commments.
- **modifyDiscussion.js**: Handles modification of existing discussions like update and delete.

### User Controllers
- **followUser.js**: Manages actions related to following users.
- **getUser.js**: Handles fetching user details.
- **modifyUser.js**: Manages modification of user details like update and delete user.
- **auth.js**: Handles user authentication actions like register and login of User.

## src/middlewares
This directory contains middleware functions.

- **auth.js**: Middleware for authentication purposes.

## src/models
This directory contains the Mongoose models for the application's data structures.

- **Comment.js**: Model for comments.
- **Discussion.js**: Model for discussions.
- **Like.js**: Model for likes.
- **LikeOnComment.js**: Model for likes on comments.
- **ReplyOnComment.js**: Model for replies on comments.
- **User.js**: Model for users.

## src/routes
This directory contains the route files that map URLs to controller actions.

### Discussion Routes
- **index.js**: Entry point for discussion-related routes.

### User Routes
- **index.js**: Entry point for user-related routes.

## utils
Utility functions used throughout the application.

## Other Files
- **.env**: Environment variable configurations.
- **.gitignore**: Specifies files to be ignored by Git.
- **package-lock.json**: Automatically generated file for tracking the project’s dependencies.
- **package.json**: Contains metadata about the project and its dependencies.
- **README.md**: This file.
- **server.js**: Entry point for the application.
"# spyne-assignment-master" 
