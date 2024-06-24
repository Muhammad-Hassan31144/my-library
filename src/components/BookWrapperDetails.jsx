import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const BookWrapperDetails = ({ isOpen, setIsOpen, book }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <img
              src={book.coverImageUrl}
              className="absolute z-0 opacity-70 w-40 h-52 rotate-12 -top-23 -left-20"
              alt="Book Background"
            />
            <div className="relative z-10">
              <div className="relative w-16 h-16 mb-2 mx-auto">
                <img
                  src={book.coverImageUrl}
                  alt={book.title}
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute -bottom-2 right-0 w-4 h-4 rounded-full bg-white flex items-center justify-center">
                  <span
                    className={`tooltip tooltip-left h-full w-full rounded-full ${
                      book.read ? "bg-green-500" : "bg-red-500"
                    }`}
                    data-tip={book.read ? "Read" : "Unread"}
                  ></span>
                </div>
              </div>
              <div className="flex flex-col gap-y-1 mb-4">
                {" "}
                <h3 className="text-3xl font-bold text-center mb-2">
                  {book.title}
                </h3>
                <p className="text-center mb-2">
                  <span className="badge badge-primary">Author</span>:{" "}
                  {book.author}
                </p>
                <p className="text-center mb-2">
                  <span className="badge badge-secondary">Genre</span>:{" "}
                  {book.genre}
                </p>
                <p className="text-center mb-2">
                  <span className="badge badge-info">Description</span>:{" "}
                  {book.description}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn btn-outline btn-error w-full"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookWrapperDetails;
