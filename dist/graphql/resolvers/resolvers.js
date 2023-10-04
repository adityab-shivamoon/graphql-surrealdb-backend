import books from "./queries/books.js";
import signInWithEmail from "./mutations/sign-in-with-email.js";
export const resolvers = {
    // same name as to schema
    Query: {
        books,
    },
    Mutation: {
        signInWithEmail,
    },
};
