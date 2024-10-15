import { useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order; // Get the order details passed from the Checkout component

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Order Confirmation
      </h1>

      {order ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <p className="mb-2">
            <strong>Order ID:</strong> {order._id}
          </p>
          <p className="mb-2">
            <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
          </p>
          <p className="mb-2">
            <strong>Delivery Address:</strong> {order.deliveryAddress}
          </p>
          <p className="mb-4">
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>

          <h3 className="font-semibold mb-2">Items Ordered:</h3>
          <ul className="space-y-2">
            {order.items.map((item) => (
              <li
                key={item.bookId}
                className="border p-4 rounded shadow-sm bg-gray-50"
              >
                <h4 className="font-bold">{item.title}</h4>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p>
                  <strong>Price:</strong> ${item.price.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg text-center mt-4">No order details available.</p>
      )}
    </div>
  );
};

export default OrderConfirmation;
