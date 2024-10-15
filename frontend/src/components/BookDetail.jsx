import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookDetail = ({ isAdmin }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [error, setError] = useState(null);
  const defaultUrl = "http://localhost:5000";

  // Fetch book details based on book ID
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${defaultUrl}/api/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch book details.");
      }
    };

    fetchBook();
  }, [id]);

  // Handle adding book to the cart
  const handleAddToCart = async () => {
    const requestedQuantity = parseInt(quantity);

    // Check if book is out of stock
    if (book.quantity <= 0) {
      alert("This book is out of stock.");
      return;
    }

    // Check if requested quantity exceeds available stock
    if (requestedQuantity > book.quantity) {
      alert(`Only ${book.quantity} books are available.`);
      return;
    }

    // Prepare cart item to be added
    const cartItem = {
      bookId: book._id,
      quantity: requestedQuantity,
    };

    try {
      // Add book to the cart
      const res = await axios.post(`${defaultUrl}/api/cart/add`, cartItem, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Cart updated: ", res.data);
      alert("Book added to cart!");
      navigate("/cart"); // Redirect to cart page after adding the book
    } catch (err) {
      console.error(err);
      alert("Error adding book to cart. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md lg:w-full -mt-20">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
              {book.title}
            </h1>
            {book.image && (
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover mb-4 rounded shadow"
              />
            )}
            <p className="text-lg font-semibold text-gray-800">
              Author: {book.author}
            </p>
            <p className="text-lg text-gray-600">
              Price: <span className="text-blue-600">${book.price}</span>
            </p>
            <p className="text-lg text-gray-600">
              Available Quantity: {book.quantity}
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Description: {book.description}
            </p>

            {/* Quantity Input */}
            <div className="my-4 flex items-center">
              <label htmlFor="quantity" className="mr-2 text-gray-700">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min="1"
                max={book.quantity} // Restrict maximum quantity based on stock
                onChange={(e) => setQuantity(e.target.value)}
                className="border rounded p-1 w-16 text-center"
              />
            </div>

            {/* Add to Cart Button - Only if not Admin */}
            {!isAdmin ? (
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white p-2 rounded w-full transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add to Cart
              </button>
            ) : (
              <p className="text-red-500 text-center">
                Admins cannot add books to the cart.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
