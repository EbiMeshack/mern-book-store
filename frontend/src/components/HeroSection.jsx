import React from "react";

const HeroSection = () => {
  return (
    <div className="relative bg-blue-600 mb-6">
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1667929048193-4fef49b0ba0a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your image URL
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Welcome to Our Online Bookstore
          </h1>
          <p className="mt-4 text-lg text-white sm:max-w-md mx-auto">
            Discover a wide range of books, from bestsellers to hidden gems.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#booklist"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition duration-300"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
