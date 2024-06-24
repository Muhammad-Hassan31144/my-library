import React, { useState, useEffect } from "react";
import Card from "./Card";
import BookWrapperDetails from "./BookWrapperDetails";
import Input from "./Input";
import menu from "../assets/menu (1).png";
import del from "../assets/delete.png";
import logo from "../assets/mylog.png";

const BookList = ({ books }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [readStatus, setReadStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredBooks, setFilteredBooks] = useState([...books]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(12);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let filtered = [...books];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (book) => book.genre.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by read status
    if (readStatus !== "all") {
      filtered = filtered.filter((book) =>
        readStatus === "read" ? book.read : !book.read
      );
    }

    // Filter by search term
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortOrder !== "none") {
      filtered.sort((a, b) => {
        const comparison = sortOrder === "asc" ? 1 : -1;
        return comparison * a.title.localeCompare(b.title);
      });
    }

    setFilteredBooks(filtered);
  }, [books, selectedCategory, readStatus, searchTerm, sortOrder]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const categories = [...new Set(books.map((book) => book.genre))];

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCardClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } w-full lg:w-60 bg-gray-800 text-white relative z-10`}
      >
        <div className="p-2 flex flex-col md:p-4 fixed">
          <div className="absolute -top-1 left-4 w-[180px] h-[80px]">
            <img src={logo} alt="Logo" className="object-cover" />
          </div>
          <div className="p-4 flex flex-col absolute left-2 top-24 overflow-auto">
            <Input onChange={(value) => setSearchTerm(value)} />

            <div className="mt-4">
              <label className="label cursor-pointer">
                <span className="label-text">Sort Order</span>
              </label>
              <div className="flex gap-2">
                <label htmlFor="none" className="label cursor-pointer">
                  <input
                    type="radio"
                    id="none"
                    name="sortOrder"
                    value="none"
                    checked={sortOrder === "none"}
                    onChange={handleSortChange}
                    className="radio radio-primary"
                  />
                  <span className="label-text">None</span>
                </label>
                <label htmlFor="asc" className="label cursor-pointer">
                  <input
                    type="radio"
                    id="asc"
                    name="sortOrder"
                    value="asc"
                    checked={sortOrder === "asc"}
                    onChange={handleSortChange}
                    className="radio radio-primary"
                  />
                  <span className="label-text">Asc</span>
                </label>
                <label htmlFor="desc" className="label cursor-pointer">
                  <input
                    type="radio"
                    id="desc"
                    name="sortOrder"
                    value="desc"
                    checked={sortOrder === "desc"}
                    onChange={handleSortChange}
                    className="radio radio-primary"
                  />
                  <span className="label-text">Desc</span>
                </label>
              </div>
            </div>

            <div className="mt-4">
              <label className="label cursor-pointer">
                <span className="label-text">Read Status</span>
              </label>
              <select
                value={readStatus}
                onChange={(e) => setReadStatus(e.target.value)}
                className="select select-primary"
              >
                <option value="all">All Status</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="label cursor-pointer">
                <span className="label-text">Categories</span>
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select select-primary"
              >
                <option value="all">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Library</h1>
          <button
            className="block lg:hidden text-gray-200 focus:outline-none"
            onClick={toggleSidebar}
          >
            <img src={isSidebarOpen ? del : menu} alt="Menu Icon" />
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {isLoaded &&
            currentBooks.map((book, index) => (
              <Card key={index} book={book} onClick={handleCardClick} />
            ))}
          {!isLoaded &&
            Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="w-full h-64 skeleton"></div>
            ))}
        </div>

        <footer className="mt-4 flex justify-center">
          <div className="btn-group">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`btn ${currentPage === index + 1 ? "btn-active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </footer>
      </main>

      {selectedBook && (
        <BookWrapperDetails
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          book={selectedBook}
        />
      )}
    </div>
  );
};

export default BookList;
