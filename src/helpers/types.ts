import { Surreal } from "surrealdb.js";

export interface Context {
  surrealDb: Surreal;
  token: string;
}

export interface Book {
  input: {
    title: String;
    author: String;
  };
}

export interface BookInput {
  input?: {
    id?: string;
  };
}

export interface BookOutput {
  id: string;
  title: String;
  author: String;
}


export interface UpdateBook {
  input?: {
    id: string;
    title?: String;
    author?: String;
  };
}

