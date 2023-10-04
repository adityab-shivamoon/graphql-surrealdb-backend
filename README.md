## Apollo GraphQL + SurrealDB Backend

- Start SurrealDB in one terminal ```surreal start memory -A --auth --user root --pass root```
- Start Apollo GraphQL in another terminal ```npm start```
- In the Browser go to the url ```http://localhost:4000/graphql``` to see the ui
- after compilation code can be found in the ```dist``` folder
- Dir level imports not allowed in ts with apollo here, hence we need to import as .js files
- need to copy schema.graphql separately in dist folder
- nodemon configured to restart server on changes (package.json)
- Caution! After changing of schema.graphql, cross check with types.ts inside helpers
- Caution! If Only schema.graphql changed, it is not updated in dist, restart the backend.
- Nodemon configured to copy schema.graphql before every restart