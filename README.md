# Calendly Backend

This is a simple Calendly clone built with Express and TypeScript.

## Running Locally

Make sure you have Node.js and npm installed.

1. Clone or Download the repository

    `git clone https://github.com/tgoyal63/calendly-backend.git`

2. Navigate to the folder

    `cd calendly-backend`

3. Install dependencies

    `npm install`

4. Start the server

    `npm start`

Your app should now be running on [localhost:3000](http://localhost:3000).

## Running With Docker

1. Build the Docker image

    `docker build -t calendly-backend .`

2. Run the Docker container

    `docker run -p 3000:3000 calendly-backend`
