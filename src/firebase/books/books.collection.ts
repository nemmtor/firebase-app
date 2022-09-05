import { collection } from "firebase/firestore";
import { firebaseDb } from "../config";
import { booksConverter } from "./books.converter";

export const booksCollectionName = "books";

export const booksCollection = collection(
  firebaseDb,
  booksCollectionName
).withConverter(booksConverter);
