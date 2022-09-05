import { QueryDocumentSnapshot } from "firebase/firestore";
import { Book } from "./books.types";

export const booksConverter = {
  toFirestore: (data: Book) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Book,
};
