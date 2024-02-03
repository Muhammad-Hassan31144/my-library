import books from "./data/books";
import BookList from "./components/BookList";
function App() {
 

  return (
    <div className="w-full">
  
      <BookList books={books}/>
     
    </div>
  );
}

export default App;
