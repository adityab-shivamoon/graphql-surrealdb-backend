export default function signInWithEmail(_, args, context) {
    console.log("args:", args.input);
    console.log("context:", context);
    return {
        token: context.token,
        email: args.input.email,
    };
}
