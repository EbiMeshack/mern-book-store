import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Navigate } from "react-router-dom";

const AdminForm = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const defaultUrl = "http://localhost:5000";
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    price: 0,
    quantity: 0,
    description: "",
    image: "",
  });

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // Redirect if the user is not an admin
  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const fetchBookData = async () => {
      if (id) {
        const res = await axios.get(`${defaultUrl}/api/books/${id}`);
        setBookData(res.data);
      }
    };

    fetchBookData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // If ID exists, update the book
        await axios.put(`${defaultUrl}/api/books/${id}`, bookData);
        alert("Book updated successfully!");
      } else {
        // Otherwise, add a new book
        await axios.post(`${defaultUrl}/api/books`, bookData);
        alert("Book added successfully!");
      }
      navigate("/admin"); // Redirect to the admin dashboard
    } catch (err) {
      console.error(err);
      alert("Error saving book");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md -mt-28">
        <h1 className="text-3xl font-bold mb-4 text-center">
          {id ? "Edit Book" : "Add Book"}
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={bookData.title}
            onChange={handleChange}
            required
            className="border p-2 mb-4 w-full placeholder-gray-600 placeholder-opacity-100"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={bookData.author}
            onChange={handleChange}
            required
            className="border p-2 mb-4 w-full placeholder-gray-600 placeholder-opacity-100"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={bookData.price}
            onChange={handleChange}
            required
            className="border p-2 mb-4 w-full placeholder-gray-600 placeholder-opacity-100"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={bookData.quantity}
            onChange={handleChange}
            required
            className="border p-2 mb-4 w-full placeholder-gray-600 placeholder-opacity-100"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={bookData.description}
            onChange={handleChange}
            required
            className="border p-2 mb-4 w-full placeholder-gray-600 placeholder-opacity-100"
            rows="2" // Set rows for better height management
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={bookData.image}
            onChange={handleChange}
            required
            className="border p-2 mb-4 w-full placeholder-gray-600 placeholder-opacity-100"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          >
            {id ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminForm;
