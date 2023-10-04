export default async function deleteBook(_, args, context) {
    const surrealDb = context.surrealDb;
    let deletedBook = await surrealDb.query(`DELETE books where id = ${args.input.id}`);
    console.log("deleted book:", deletedBook);
    return deletedBook[0];
}
