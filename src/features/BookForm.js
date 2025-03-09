import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookAsync } from "./booksSlice";

const BookForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.books);
  const [formData, setFormData] = useState({
    bookName: "",
    author: "",
    language: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addBookAsync(formData));
    setFormData({ bookName: "", author: "", language: "" });
  };

  return (
    <div>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="bookName"
          value={formData.bookName}
          onChange={handleChange}
          placeholder="Title"
        />
        <br />
        <br />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
        />
        <br />
        <br />
        <input
          type="text"
          name="language"
          value={formData.language}
          onChange={handleChange}
          placeholder="Language"
        />
        <br />
        <br />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};
export default BookForm;
