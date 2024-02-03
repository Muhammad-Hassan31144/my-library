import React from "react";

function Card({ book }) {
  return (
    <div
      key={book.title}
      className="relative antialiased text-gray-900 -z-10 w-36 bg-gray-50 opacity-90 mt-2 h-64 rounded-lg  flex flex-col lg:mx-3 mx-1"
    >
      <div className="flex p-2 gap-1">
        <div className="circle">
          <span className="bg-blue-500 inline-block center w-3 h-3 rounded-full"></span>
        </div>
        <div className="circle">
          <span className="bg-purple-500 inline-block center w-3 h-3 rounded-full"></span>
        </div>
        <div className="circle">
          <span className="bg-pink-500 box inline-block center w-3 h-3 rounded-full"></span>
        </div>
      </div>
      <div className="card__content flex">
        <figure className="h-fit lg:h-fit  lg:w-32 max-w-32 pl-2 rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden brightness-70">
          <img
            className=" w-full object-cover object-center scale-100 hover:scale-105 rounded-lg shadow-md"
            src={book.coverImageUrl}
            alt="Book Cover"
          />
        </figure>
        
      </div>
    </div>
  );
}

export default Card;
{/* <div className="w-2/3 md:p-4 p-1 flex flex-col h-fit justify-between leading-normal bg-gray-300">
          <div className="flex flex-col gap-1">
          <h2 className="card-title">
            {book.title}
            <div className="badge badge-secondary">
              {book.read ? "Read" : "Unread"}
            </div>
          </h2>
          </div>
          <p className="hidden xl:block">{book.description}</p> 
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{book.genre}</div>
          </div>
        </div> */}