export default async function updateBook(_, args, context) {
    const surrealDb = context.surrealDb;
    // Update a record with a specific ID
    const updatedBook = await surrealDb.update(`${args.input.id}`, {
        title: args.input.title,
        author: args.input.author,
    });
    console.log("updated book:", updatedBook);
    return updatedBook[0];
}
