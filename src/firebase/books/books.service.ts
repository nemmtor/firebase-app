import { addDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { firebaseDb } from "../config";
import { booksCollection, booksCollectionName } from "./books.collection";
import { booksConverter } from "./books.converter";
import { Book } from "./books.types";

export const getAll = async () => {
  const { docs } = await getDocs(booksCollection);

  return docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getById = async (id: string) => {
  const docRef = doc(firebaseDb, booksCollectionName, id).withConverter(
    booksConverter
  );

  const snapshot = await getDoc(docRef);

  return snapshot.data();
};

export const create = async (book: Book) => {
  const docRef = await addDoc(booksCollection, book);
  const bookRef = docRef.withConverter(booksConverter);

  const snapshot = await getDoc(bookRef);
  return snapshot.data();
};
