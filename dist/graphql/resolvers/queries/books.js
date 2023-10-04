export default async function books(_, args, context) {
    const surrealDb = context.surrealDb;
    // Select all books records
    let booksArr = await surrealDb.select("books");
    if (!args.input || typeof args.input.id === null) {
        return booksArr;
    }
    else {
        // return book of particular id
        let book = await surrealDb.query(`SELECT * FROM books where id = ${args.input.id}`);
        // console.log("book is:", book)
        return book[0].result;
    }
}
