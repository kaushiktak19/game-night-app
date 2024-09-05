# Game Night App

## Overview

This project consists of a frontend and a backend for a game night application. The frontend is built with React and handles user interactions and authentication, while the backend is built with Express and MongoDB to handle API requests, user authentication, and data management.

## Table of Contents

- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)

## Frontend Setup

The frontend is built using React and can be run locally with the following steps:

1. Clone the Repository
    ```bash
    git clone https://github.com/kaushiktak19/game-night-app.git
    cd game-night-app/frontend
    ```

2. Install Dependencies
    ```bash
    npm install
    ```

3. Start the Frontend Development Server
    ```bash
    npm start
    ```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

## Backend Setup

The backend is built using Express and MongoDB. Follow these steps to set it up and run it locally:

1. Navigate to the Backend Directory
    ```bash
    cd ../backend
    ```

2. Install Dependencies
    ```bash
    npm install
    ```

3. Start the Backend Server
    ```bash
    npm run dev
    ```

The backend will be available at [http://localhost:5000](http://localhost:5000).

## API Endpoints

### User Authentication

- **Register a New User**
    - **Endpoint:** POST /api/auth/register
    - **Description:** Registers a new user.
    - **Request Body:**
        ```json
        {
            "username": "string",
            "email": "string",
            "password": "string",
            "role": "string" // either "player" or "host"
        }
        ```

- **Login**
    - **Endpoint:** POST /api/auth/login
    - **Description:** Logs in an existing user and returns a JWT token.
    - **Request Body:**
        ```json
        {
            "email": "string",
            "password": "string"
        }
        ```
    - **Response:**
        ```json
        {
            "token": "string" // JWT token
        }
        ```

### Game Library

- **Get All Games**
    - **Endpoint:** GET /api/games
    - **Description:** Retrieves a list of all games in the library.

- **Add a New Game**
    - **Endpoint:** POST /api/games
    - **Description:** Adds a new game to the library.
    - **Request Body:**
        ```json
        {
            "name": "string", // game name
            "type": "string", // game type (e.g., board game, card game)
            "minPlayers": "number", // minimum number of players
            "maxPlayers": "number", // maximum number of players
            "duration": "number", // game duration in minutes
            "complexity": "string", // complexity level (e.g., easy, medium, hard)
            "status": "string" // e.g., owned, wishlist
        }
        ```

- **Get a Game by ID**
    - **Endpoint:** GET /api/games/:id
    - **Description:** Retrieves a game by its ID.

- **Update a Game**
    - **Endpoint:** PUT /api/games/:id
    - **Description:** Updates a game by its ID.
    - **Request Body:**
        ```json
        {
            "name": "string",
            "type": "string",
            "minPlayers": "number",
            "maxPlayers": "number",
            "duration": "number",
            "complexity": "string",
            "status": "string"
        }
        ```

- **Delete a Game**
    - **Endpoint:** DELETE /api/games/:id
    - **Description:** Deletes a game by its ID.

### Game Night

- **Create a Game Night**
    - **Endpoint:** POST /api/gamenights
    - **Description:** Creates a new game night event.
    - **Request Body:**
        ```json
        {
            "title": "string", // title of the game night
            "date": "string", // ISO format date (e.g., 2024-09-15)
            "time": "string", // time in 24-hour format (e.g., 19:00)
            "location": "string", // event location
            "gameDetails": {
                "name": "string", // name of the game
                "type": "string" // type of game (e.g., board game)
            }
        }
        ```

- **Get All Game Nights**
    - **Endpoint:** GET /api/gamenights
    - **Description:** Retrieves a list of all game nights.

- **Get a Game Night by ID**
    - **Endpoint:** GET /api/gamenights/:id
    - **Description:** Retrieves a game night by its ID.

- **Update a Game Night**
    - **Endpoint:** PUT /api/gamenights/:id
    - **Description:** Updates a game night by its ID.
    - **Request Body:**
        ```json
        {
            "title": "string",
            "date": "string", // ISO format date
            "time": "string", // time in 24-hour format
            "location": "string",
            "gameDetails": {
                "name": "string",
                "type": "string"
            }
        }
        ```

- **Delete a Game Night**
    - **Endpoint:** DELETE /api/gamenights/:id
    - **Description:** Deletes a game night by its ID.

## Testing with Postman

For testing purposes, you can use these request bodies with Postman to make API calls and validate functionality.
