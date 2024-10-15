import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const role = localStorage.getItem("role");
  const defaultUrl = "http://localhost:5000";

  // Redirect if the user is not an admin
  if (role !== "user") {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${defaultUrl}/api/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-lg">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-300 p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
              <p className="text-sm text-gray-600">
                Total Amount:{" "}
                <span className="font-bold">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Delivery Address: {order.deliveryAddress}
              </p>
              <p className="text-sm text-gray-600">
                Payment Method: {order.paymentMethod}
              </p>

              <h3 className="mt-4 font-semibold">Items Ordered:</h3>
              <ul className="space-y-2">
                {order.items.map((item) => (
                  <li
                    key={item.bookId}
                    className="border border-gray-200 p-3 rounded-md bg-gray-50"
                  >
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-sm text-gray-500">
                      Quantity:{" "}
                      <span className="font-semibold">{item.quantity}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Price:{" "}
                      <span className="font-semibold">
                        ${item.price.toFixed(2)}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
