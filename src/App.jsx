import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import books from "./data/books";
import BookList from "./components/BookList";
import Welcome from './components/Welcome';

function App() {
  return (
    <Router basename="/my-library">
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/books" element={<BookList books={books} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
