import React, { useState, useEffect } from "react";
import Card from "./Card";
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

  return (
    <>
      <div className="flex w-fit min-h-screen">
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } w-60 bg-gray-800 text-white relative z-10`}
        >
          <div className="p-2 flex flex-col md:p-4 fixed">
            <div className="absolute -top-1 left-4 w-[180px] h-[80px] ">
              <img src={logo} alt="" className="object-cover" />
            </div>
            <div className="p-4 flex flex-col absolute left-2 top-24 overflow-auto">
              <div className="hs-tooltip inline-block my-8">
                <Input onChange={(value) => setSearchTerm(value)} />
              </div>

              <div className="hs-tooltip inline-block [--placement:right] my-7">
                <div className="w-48 ">
                  <label htmlFor="none" className="label cursor-pointer">
                    <span className="label-text">None</span>
                    <input
                      type="radio"
                      id="none"
                      name="sortOrder"
                      value="none"
                      checked={sortOrder === "none"}
                      onChange={handleSortChange}
                      className="radio radio-primary"
                    />
                  </label>
                </div>
                <div className="w-48 ">
                  <label htmlFor="asc" className="label cursor-pointer">
                    <span className="label-text">Ascending</span>
                    <input
                      type="radio"
                      id="asc"
                      name="sortOrder"
                      value="asc"
                      checked={sortOrder === "asc"}
                      onChange={handleSortChange}
                      className="radio radio-primary"
                    />
                  </label>
                </div>
                <div className="w-48 ">
                  <label htmlFor="desc" className="label cursor-pointer">
                    <span className="label-text">Descending</span>
                    <input
                      type="radio"
                      id="desc"
                      name="sortOrder"
                      value="desc"
                      checked={sortOrder === "desc"}
                      onChange={handleSortChange}
                      className="radio radio-primary"
                    />
                  </label>
                </div>
              </div>
              <div className="hs-tooltip inline-block [--placement:right] ">
                <select
                  value={readStatus}
                  onChange={(e) => setReadStatus(e.target.value)}
                  className="dropdown dropdown-end menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
                >
                  <option value="all">All Status</option>
                  <option value="read">Read</option>
                  <option value="unread">Unread</option>
                </select>
              </div>
              <div className="hs-tooltip inline-block [--placement:right] my-7">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="dropdown dropdown-end menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
                >
                  <option className="" value="all">
                    All Categories
                  </option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
        <h1 className="text-2xl text-center font-bold my-4">My Library</h1>
          <button
            className="block fixed md:hidden text-gray-200 focus:outline-none -mt-12"
            onClick={toggleSidebar}
          >
            {!isSidebarOpen ? (
              <div className="p-1 m-1">
                <img src={menu} alt="" />
              </div>
            ) : (
              <div className="p-1 m-1">
                <img src={del} alt="" />
              </div>
            )}
          </button>
         
          <div className="flex flex-wrap">
            {isLoaded &&
              filteredBooks.map((book, index) => <Card key={index} book={book} />)}
            {!isLoaded &&
              Array.from({ length: 21 }).map((_, index) => (
                <div key={index} className=" opacity-90 mt-2 lg:mx-4 mx-1   ">
                  <div className="w-36  h-64 skeleton">

                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>

  );
};

export default BookList;
