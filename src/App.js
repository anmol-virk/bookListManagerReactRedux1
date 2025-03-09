import "./styles.css";
import BookForm from "./features/BookForm";
import BookView from "./features/BookView";

export default function App() {
  return (
    <div className="App">
      <BookForm />
      <BookView />
    </div>
  );
}
