# express-typescript-template
Welcome to my ExpressJS API template with Typescript! This template provides a solid foundation for building robust and scalable APIs using ExpressJS, Typescript, and support for both MongoDB and PostgreSQL databases. It comes packed with handy helpers like Morgan for logging and Swagger for API documentation.

# Features
1. Typescript Support: Write your API in Typescript, enabling type-checking and better code organization.
2. MongoDB and PostgreSQL Support: Choose between MongoDB and PostgreSQL for your database needs, with easy-to-use integration.
3. Morgan Logger: Use Morgan for logging HTTP requests, making it easier to debug and monitor your API.
4. Swagger Documentation: Generate API documentation effortlessly with Swagger, providing a clear and interactive interface for users.

# Getting started
1. Clone the repository: `git clone https://github.com/rodrigourban/express-ts-template`
2. Install dependencies: `bun install`
3. Create a .env file for your environment variables on root and add 
```
APP_PORT=3000
MONGO_URI=YOUR_MONGO_URI
PGSQL_URI=YOUR_POSTGRE_URI
```
4. Start the server: bun run dev
5. Access Swagger documentation at http://localhost:3000/api-docs


When choosing a dabase, remember to remove the implementation you wont use.

DB Contracts are placed inside database/mongodb-postgresql/model

If you are going to use Mongodb, remember to remove postgres folder (databases/postgresql), the URI from .env and
the dependencies\
`bun remove pg typeorm class-validator class-transformer`

If you are going to use Postgres, remember to remove mongodb folder (databases/mongodb), the URI from .env and
the dependencies\
`bun remove mongoose @types/mongoose joi`

# Libraries used

### Testing
https://github.com/jestjs/jest
https://github.com/ladjs/supertest


### Documentation
https://github.com/scottie1984/swagger-ui-express\
https://swagger-autogen.github.io/docs/\
To generate the new documentation:\
`ts-node src/swagger.ts`

### Logger
https://github.com/expressjs/morgan

### PostgreSQL with TypeORM
https://typeorm.io/entities

Validation:\
https://github.com/typestack/class-validator
https://github.com/typestack/class-transformer

### Mongodb with Mongoose
https://mongoosejs.com/docs/

Validation:
https://www.npmjs.com/package/joi

# Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

# License
This project is licensed under the MIT License.

Thanks, 

Rodrigo Urban.