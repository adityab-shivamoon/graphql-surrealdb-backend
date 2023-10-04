import { BookInput, Context } from "../../../helpers/types";

export default async function deleteBook(
  _: any,
  args: BookInput,
  context: Context
) {
  const surrealDb = context.surrealDb;

  let deletedBook = await surrealDb.query(
    `DELETE books where id = ${args.input.id}`
  );
  console.log("deleted book:", deletedBook);
  return deletedBook[0];
}
