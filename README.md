# express-typescript-template

To install dependencies:

```bash
bun install
```
Create a .env file on root and add 
```
APP_PORT=3000
MONGO_URI=YOUR_MONGO_URI
PGSQL_URI=YOUR_POSTGRE_URI
```
To run:

```bash
bun run index.ts
```

### Testing
https://github.com/jestjs/jest
https://github.com/ladjs/supertest


### Documentation
https://github.com/scottie1984/swagger-ui-express
https://swagger-autogen.github.io/docs/
To generate the new documentation:
`ts-node src/swagger.ts`

### Logger
https://github.com/expressjs/morgan

### PostgreSQL with TypeORM
https://typeorm.io/entities

Validation:
https://github.com/typestack/class-validator
https://github.com/typestack/class-transformer

### Mongodb with Mongoose
https://mongoosejs.com/docs/

Validation:
https://www.npmjs.com/package/joi


When choosing a dabase, remember to remove not used connections on src/app/init.ts

DB Contracts are placed inside database/mongodb-postgresql/model

If you are going to use Mongodb, remember to remove postgres folder (databases/postgresql), the URI from .env and
the dependencies
`bun remove pg typeorm class-validator class-transformer`

If you are going to use Postgres, remember to remove mongodb folder (databases/mongodb), the URI from .env and
the dependencies
`bun remove mongoose @types/mongoose joi`