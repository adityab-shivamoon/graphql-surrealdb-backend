import books from "./queries/books.js";
import addBook from "./mutations/add-book.js";
import updateBook from "./mutations/update-book.js";
import deleteBook from "./mutations/delete-book.js";
const resolvers = {
    // same name as to schema
    Query: {
        books,
    },
    Mutation: {
        addBook,
        updateBook,
        deleteBook
    },
};
export default resolvers;
