import { Book, Context } from "../../../helpers/types";


export default async function addBook(_: any, args: Book, context: Context) {
  const surrealDb = context.surrealDb;

  let created = await surrealDb.create("books", {
    title: args.input.title,
    author: args.input.author,
  });
  console.log("Created Book:", created);
  
  return created[0];
}
