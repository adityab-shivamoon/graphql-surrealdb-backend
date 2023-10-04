import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { Surreal } from "surrealdb.js";
// need to import from .js files to prevent error in ts
import typeDefs  from "./graphql/type-defs/index.js";
import resolvers  from "./graphql/resolvers/index.js";
import { Context } from "./helpers/types.js";

// .....................................Database Connection.........................................

const surrealDb = new Surreal();

try {
  // Connect to the database
  await surrealDb.connect("http://127.0.0.1:8000/rpc");

  // Signin as a namespace, database, or root user
  await surrealDb.signin({
    user: "root",
    pass: "root",
  });

  // Select a specific namespace / database
  await surrealDb.use({ns: 'test', db: 'test'});

  console.log(` 
   .d8888b.                                             888 8888888b.  888888b.
  d88P  Y88b                                            888 888  'Y88b 888  '88b
  Y88b.                                                 888 888    888 888  .88P
   'Y888b.   888  888 888d888 888d888  .d88b.   8888b.  888 888    888 8888888K.
      'Y88b. 888  888 888P'   888P'   d8P  Y8b     '88b 888 888    888 888  'Y88b
        '888 888  888 888     888     88888888 .d888888 888 888    888 888    888
  Y88b  d88P Y88b 888 888     888     Y8b.     888  888 888 888  .d88P 888   d88P
   'Y8888P'   'Y88888 888     888      'Y8888  'Y888888 888 8888888P'  8888888P'   connection successful!`);
} catch (e) {
  console.error("ERROR connecting to Database:", e);
}

// ...............................................................................................................

const PORT = 4000;
// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  introspection: true, // gives ui, should be false while production
});
// Ensure we wait for our server to start
await server.start();

const contextHandler = async ({ req }) => {
  // pass the database connection and the header token
  return { surrealDb: surrealDb, token: req.headers.token };
};

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(cors());
app.use(express.json());
app.use(
  "/graphql",
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    // gives context to all resolvers
    context: contextHandler,
  })
);

// Modified server startup
await new Promise<void>((resolve) =>
  httpServer.listen({ port: PORT }, resolve)
);
console.log(`\nGraphQl Server running on port ${PORT}`);
