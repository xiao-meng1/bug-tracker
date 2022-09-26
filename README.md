# Bug Tracker

Bug Tracker is an issue ticket tracking app based on Jira. Users can register and sign in to create and assign tickets to other users. Check it out [here](https://bug-tracker-xm.netlify.app)!

### Technologies:

- Backend: Express, NodeJS, PostgreSQL, Prisma, Docker, Render
- Frontend: React, Redux, React Router, Netlify

## Features

Backend:

- REST API supporting CRUD methods for Issue, User, and Session resources
- Authentication using JSON web tokens and Passport.js
- Form validation and centralized error handling
- Build and deployment using docker

Frontend:

- State management using Redux
- Form validation displaying frontend and backend errors
- Centralized error handling

## Requirements

- node (18.4.0)
- npm (8.12.1)

## Installation and Usage

1. Install dependencies in root, frontend, and backend directories.

```bash
npm install
```

2.  Setup the following environment variables in .env files for frontend and backend directories.

```bash
# /frontend
# REACT_APP_BACKEND_ORIGIN=FOO

# /backend
# FRONTEND_ORIGIN=BAZ
# PORT=BAR
# DATABASE_URL=QUX
# POSTGRES_USER=QUUX
# POSTGRES_PASSWORD=QUUZ
# JWT_SECRET=CORGE
```

3. Setup Postgres volume and Prisma.

```bash
docker-compose up -d
npx prisma init
npx prisma migrate dev
```

4. Serve client and server from root directory.

```bash
npm run dev
```
