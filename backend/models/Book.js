const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // New field for book image
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
