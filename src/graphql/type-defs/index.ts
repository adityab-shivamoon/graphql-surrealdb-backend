import { readFileSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

console.log("url:", import.meta.url)

const typeDefs = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), 'schema.graphql'),
  { encoding: 'utf-8' }
);

export default typeDefs;