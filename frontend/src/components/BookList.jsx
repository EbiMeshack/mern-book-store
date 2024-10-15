import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const defaultUrl = "http://localhost:5000";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${defaultUrl}/api/books`);
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div id="booklist" className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Available Books
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <h2 className="text-base font-semibold mb-2 text-gray-800">
                {book.title}
              </h2>
              <p className="text-gray-600 text-sm">
                Author: <span className="font-medium">{book.author}</span>
              </p>
              <p className="text-gray-800 font-semibold mt-1 text-sm">
                Price: <span className="text-blue-600">${book.price}</span>
              </p>
              <Link
                to={`/book/${book._id}`}
                className="mt-2 inline-block text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded transition-colors duration-300 ease-in-out text-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
