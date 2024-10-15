import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item; // Get the selected book passed from the Cart component
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator
  const defaultUrl = "http://localhost:5000";

  // Calculate total amount (for a single book)
  const totalAmount = item ? item.bookId.price * item.quantity : 0;

  const handlePlaceOrder = async () => {
    if (!deliveryAddress) {
      setErrorMessage("Delivery address is required.");
      return; // Prevent placing the order if the address is empty
    }

    setLoading(true); // Start loading state
    setErrorMessage(""); // Reset error message

    try {
      const orderData = {
        items: [
          {
            bookId: item.bookId._id,
            title: item.bookId.title,
            quantity: item.quantity,
            price: item.bookId.price,
          },
        ],
        totalAmount,
        deliveryAddress,
        paymentMethod,
      };

      // Send the order data to the backend
      const res = await axios.post(`${defaultUrl}/api/orders`, orderData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.status === 201) {
        // Navigate to the Order Confirmation page with the order data
        navigate("/order-confirmation", { state: { order: res.data } });
      }
    } catch (err) {
      console.error("Error placing order:", err);
      setErrorMessage("Failed to place order. Please try again."); // Set error message for user
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      {item && (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">Selected Item</h2>
          <p className="text-gray-700">Title: {item.bookId.title}</p>
          <p className="text-gray-700">Price: ${item.bookId.price}</p>
          <p className="text-gray-700">Quantity: {item.quantity}</p>
          <p className="font-bold text-lg">
            Total Amount: ${totalAmount.toFixed(2)}
          </p>
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>
        <input
          type="text"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="Enter your delivery address"
          className="border p-2 w-full mt-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border p-2 w-full mt-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cash-on-delivery">Cash on Delivery</option>
        </select>
      </div>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}{" "}
      {/* Display error message */}
      <button
        onClick={handlePlaceOrder}
        className={`mt-6 bg-green-500 text-white p-3 rounded hover:bg-green-600 transition duration-200 ease-in-out ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`} // Disable button when loading
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;
