import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null); // State to handle fetch errors
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const defaultUrl = "http://localhost:5000";

  // Redirect if the user is not a user
  if (role !== "user") {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${defaultUrl}/api/cart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCart(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch cart. Please try again later."); // Set error message
      }
    };

    fetchCart();
  }, []);

  const handleRemoveFromCart = async (bookId) => {
    try {
      await axios.delete(`${defaultUrl}/api/cart/remove/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCart((prevCart) =>
        prevCart.filter((item) => item.bookId?._id !== bookId)
      );
    } catch (err) {
      console.error(err);
      setError("Failed to remove book from cart."); // Set error message
    }
  };

  // Navigate to checkout when Buy Now button is clicked for a specific book
  const handleCheckout = (item) => {
    navigate("/checkout", { state: { item } }); // Pass the selected book's details
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Display error message if exists */}
      {cart.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.bookId?._id || Math.random()} // Use a random fallback if bookId is missing
              className="flex items-center border border-gray-300 p-4 rounded shadow-md"
            >
              {item.bookId ? ( // Check if bookId exists
                <>
                  {item.bookId.image ? ( // Check if image exists
                    <img
                      src={item.bookId.image}
                      alt={item.bookId.title}
                      className="w-24 h-32 object-cover mr-4"
                    />
                  ) : (
                    <div className="w-24 h-32 bg-gray-300 mr-4 flex items-center justify-center">
                      <p className="text-gray-600">No image available</p>
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">
                      {item.bookId.title}
                    </h2>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
                    <button
                      onClick={() => handleRemoveFromCart(item.bookId._id)}
                      className="mt-2 bg-red-500 text-white p-1 rounded hover:bg-red-600 sm:p-2"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleCheckout(item)}
                      className="mt-2 bg-blue-500 text-white p-1 rounded hover:bg-blue-600 sm:p-2"
                    >
                      Buy Now
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-red-500">Book not found.</p> // Handle missing bookId
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
