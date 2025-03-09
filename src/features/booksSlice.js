import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PREFIX_URL = "https://rps-1-backend.vercel.app";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(`${PREFIX_URL}/books`);
  return response.data;
  console.log("response", response);
});

export const addBookAsync = createAsyncThunk(
  "books/addBook",
  async (newBook) => {
    const response = await axios.post(`${PREFIX_URL}/books`, newBook);
    return response.data;
  }
);

export const deleteBookAsync = createAsyncThunk(
  "books/deleteBook",
  async (id) => {
    const response = await fetch(`${PREFIX_URL}/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        console.log("Fetched books data:", action.payload);
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteBookAsync.fulfilled, (state, action) => {
        const id = action.payload;
        state.books = state.books.filter((book) => book._id !== id);
      })
      .addCase(addBookAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books.push(action.payload);
      });
  },
});

export default bookSlice.reducer;
