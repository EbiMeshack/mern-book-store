import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminForm from "./components/AdminForm";
import AdminDashboard from "./components/AdminDashbord";
import Home from "./pages/Home";
import BookDetail from "./components/BookDetail";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import MyOrders from "./components/MyOrders";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const role = localStorage.getItem("role");
  useEffect(() => {
    // On component mount, check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isAdmin={role === "admin"}
      />
      <div className="min-h-screen bg-gray-100">
        {/* You can add a navbar here if you want */}
        <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          ></Route>
          <Route path="/signup" element={<Signup />}></Route>
          {/* Home Page - Book List for Customers */}
          <Route path="/" element={<Home />} />

          {/* Book Details Page */}
          <Route
            path="/book/:id"
            element={<BookDetail isAdmin={role === "admin"} />}
          />

          {/* Cart Page */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/myorders" element={<MyOrders />} />

          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AdminForm />} />
          <Route
            path="/admin/edit/:id" // Edit route
            element={<AdminForm />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
