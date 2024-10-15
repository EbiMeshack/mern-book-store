import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultUrl = "http://localhost:5000";
  const role = localStorage.getItem("role");

  // Redirect if the user is not an admin
  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${defaultUrl}/api/books`);
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`${defaultUrl}/api/books/${id}`);
        setBooks(books.filter((book) => book._id !== id));
        alert("Book deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("Error deleting book");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <Link
        to="/admin/add"
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block"
      >
        Add Book
      </Link>
      {/* Responsive Table or Card Layout */}
      <div className="hidden md:block">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Author</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{book.title}</td>
                <td className="border border-gray-300 p-2">{book.author}</td>
                <td className="border border-gray-300 p-2">${book.price}</td>
                <td className="border border-gray-300 p-2">{book.quantity}</td>
                <td className="border border-gray-300 p-2">
                  <Link
                    to={`/admin/edit/${book._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>{" "}
                  |{" "}
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card Layout for Smaller Screens */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {books.map((book) => (
          <div key={book._id} className="bg-white border rounded shadow p-4">
            <h2 className="font-bold text-xl">{book.title}</h2>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Price:</strong> ${book.price}
            </p>
            <p>
              <strong>Quantity:</strong> {book.quantity}
            </p>
            <div className="mt-2">
              <Link
                to={`/admin/edit/${book._id}`}
                className="text-blue-500 hover:underline mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(book._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
