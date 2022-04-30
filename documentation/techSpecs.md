# Technical Specifications

## Backend API
The backend API is written using Express / TypeScript. I used Visual Studio Code as an IDE and I tested my endpoints locally using Postman. The main libraries I used were assert, body-parser, cors, dotenv, express, http, http-status-codes, lodash, mysql, and ts-node. 

I connected to the MySQL database using the mysql library. I was able to perform queries and do data manipulation from the queries to respond with more interpretable results in the API responses. The API endpoints are below:

### User Endpoints
Base URL: `http://localhost:8080/users`
- `POST /`: create new user
- `POST /login`: create new user session
- `GET /:userID`: get user by ID
- `DELETE /:userID`: delete user by ID

### Recipe Endpoints
Base URL: `http://localhost:8080/recipes`
- `POST /`: create new recipe
- `PUT /:recipeID`: update existing recipe with ID
- `GET /tools`: get tools available for recipes
- `GET /tags`: get tags available for recipes
- `GET /:recipeID`: get recipe by ID
- `GET ?user=X&title=X&tags=X,X,...`: get recipes matching (optional) user, title, and tags criteria
- `DELETE /:recipeID`: delete recipe by ID

## Frontend Client
I wrote the frontend client in Python and created a script to perform CRUD actions. The frontend performs some input sanitizing (e.g. must enter a value, must enter a number when prompted for a numbre). However, almost all semantic error-handling is done by the backend API, sending meaningful error messages when appropriate.