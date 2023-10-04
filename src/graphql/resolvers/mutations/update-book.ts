import { UpdateBook, Context } from "../../../helpers/types";

type Book = {
    // id : String
    title: String,
    author: String
}

export default async function updateBook(
  _: any,
  args: UpdateBook,
  context: Context
) {
  const surrealDb = context.surrealDb;

  // Update a record with a specific ID
  const updatedBook = await surrealDb.update<Book>(`${args.input.id}`, {
    title: args.input.title,
    author: args.input.author,
  });

  console.log("updated book:", updatedBook);

  return updatedBook[0];
}
