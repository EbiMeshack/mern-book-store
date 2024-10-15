import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn, isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log("Logging out..."); // Debug log
    localStorage.removeItem("token"); // Remove token to log out
    localStorage.removeItem("role");
    setIsLoggedIn(false); // Update the state to reflect logged-out status
    navigate("/login"); // Redirect to login
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      alert("You must be logged in to access the cart.");
    } else {
      navigate("/cart"); // Navigate to the cart if logged in
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">BookStore</Link>
        </div>

        {/* Navbar Links for larger screens */}
        <div className="hidden md:flex md:items-center md:justify-end space-x-8">
          <Link
            to="/"
            className="block text-white text-lg p-2 hover:text-gray-400"
          >
            Home
          </Link>

          {isAdmin ? (
            <>
              <Link
                to="/admin"
                className="block text-white text-lg p-2 hover:text-gray-400"
              >
                Dashboard
              </Link>
              <Link
                to="/login"
                onClick={handleLogout}
                className="block text-white text-lg p-2 hover:text-gray-400"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              {isLoggedIn ? (
                <>
                  <Link
                    to="/cart"
                    className="block text-white text-lg p-2 hover:text-gray-400"
                  >
                    Cart
                  </Link>
                  <Link
                    to="/myorders"
                    className="block text-white text-lg p-2 hover:text-gray-400"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/login"
                    onClick={handleLogout}
                    className="block text-white text-lg p-2 hover:text-gray-400"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block text-white text-lg p-2 hover:text-gray-400"
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col items-start p-4 space-y-2">
          <button onClick={toggleMenu} className="text-white text-lg self-end">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <Link
            to="/"
            className="text-white text-lg p-2 hover:text-gray-400"
            onClick={toggleMenu}
          >
            Home
          </Link>

          {isAdmin ? (
            <>
              <Link
                to="/admin"
                className="text-white text-lg p-2 hover:text-gray-400"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/login"
                onClick={() => {
                  console.log("Admin logging out..."); // Debug log
                  handleLogout();
                }}
                className="text-white text-lg p-2 hover:text-gray-400"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              {isLoggedIn ? (
                <>
                  <Link
                    to="/cart"
                    className="text-white text-lg p-2 hover:text-gray-400"
                    onClick={toggleMenu}
                  >
                    Cart
                  </Link>
                  <Link
                    to="/myorders"
                    className="text-white text-lg p-2 hover:text-gray-400"
                    onClick={toggleMenu}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/login"
                    onClick={handleLogout}
                    className="text-white text-lg p-2 hover:text-gray-400"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-white text-lg p-2 hover:text-gray-400"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
