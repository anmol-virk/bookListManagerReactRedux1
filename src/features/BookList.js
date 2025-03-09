import React from "react";
import { useDispatch } from "react-redux";
import { deleteBookAsync } from "./booksSlice";

const BookList = ({ books }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteBookAsync(id));
  };

  return (
    <ul>
      {books?.map((book) => (
        <li key={book._id}>
          {book.bookName} - {book.author} - {book.language}{" "}
          <button onClick={() => handleDelete(book._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
