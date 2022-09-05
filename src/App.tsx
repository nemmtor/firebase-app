import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User
} from "firebase/auth";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import * as booksService from "./firebase/books/books.service";
import { firebaseAuth } from "./firebase/config";

export const App = () => {
  const [email, setEmail] = useState("");

  const onChangeEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const [password, setPassword] = useState("");
  const onChangePassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );

  const [bookId, setBookId] = useState("");
  const onChangeBookId = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setBookId(event.target.value);
  }, []);

  const [bookName, setBookName] = useState("");
  const onChangeBookName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setBookName(event.target.value);
    },
    []
  );

  const [bookPagesAmount, setBookPagesAmount] = useState<number>(0);
  const onChangeBookPagesAmount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setBookPagesAmount(parseInt(event.target.value, 10));
    },
    []
  );

  const onSignIn = useCallback(() => {
    signInWithEmailAndPassword(firebaseAuth, email, password);
  }, [email, password]);

  const onSignUp = useCallback(() => {
    createUserWithEmailAndPassword(firebaseAuth, email, password);
  }, [email, password]);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user: User | null) => {
      console.log("user: ", user);
    });
    return unsubscribe;
  }, []);

  const onShowBooks = useCallback(async () => {
    const books = await booksService.getAll();
    console.log("books: ", books);
  }, []);

  const onShowBookById = useCallback(async () => {
    const book = await booksService.getById(bookId);
    console.log("book by id: ", book);
  }, [bookId]);

  const onCreateBook = useCallback(async () => {
    const book = await booksService.create({
      name: bookName,
      pagesAmount: bookPagesAmount,
    });

    console.log("created book: ", book);
  }, [bookName, bookPagesAmount]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <span>Email:</span>
        <input type="text" value={email} onChange={onChangeEmail} />
      </div>

      <div style={{ display: "flex" }}>
        <span>Password:</span>
        <input type="password" value={password} onChange={onChangePassword} />
      </div>

      <button onClick={onSignIn}>LOGIN</button>
      <button onClick={onSignUp}>REGISTER</button>

      <div>
        <input type="text" value={bookId} onChange={onChangeBookId} />
        <button onClick={onShowBooks}>SHOW ALL BOOKS</button>
        <button onClick={onShowBookById}>SHOW BOOK BY ID</button>
      </div>

      <div>
        <input type="text" value={bookName} onChange={onChangeBookName} />
        <input
          type="number"
          value={bookPagesAmount}
          onChange={onChangeBookPagesAmount}
        />
        <button onClick={onCreateBook}>CREATE BOOK</button>
      </div>
    </>
  );
};
