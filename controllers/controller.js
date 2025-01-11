const Book = require("../models/books.js");
const notFound = require("../middleware/notFound.middleware.js");
const {
  updateBookValidator,
  createBookValidator,
} = require("../validators/book.validator.js");

const header = { "Content-Type": "application/json" };

const getBooks = async (req, res) => {
  res.writeHead(200, header);
  const books = await Book.find({});
  if (books?.error) return notFound(req, res, "error in getting book(s)");

  res.end(JSON.stringify({ books: books }));
};

const getBook = async (req, res) => {
  const splittedUrl = req.url.split("/");
  const id = splittedUrl[splittedUrl.length - 1];
  const book = await Book.findById(id);
  console.log(book, "books");
  if (book) {
    res.writeHead(200, header);
    res.end(JSON.stringify({ book: book }));
  } else {
    notFound(req, res, "error in getting book(s)");
  }
};

const addBook = async (req, res) => {
  let body = "";

  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    const book = JSON.parse(body); // change recieve string to json
    const validateBook = createBookValidator(book);

    if (validateBook?.isValid) {
      await Book.create(book);
      res.writeHead(200, header);
      res.end(
        JSON.stringify({
          success: true,
          message: "Book is added successfully",
        })
      );
    } else {
      notFound(req, res, validateBook?.error);
    }
  });
};

const deleteBook = async (req, res) => {
  const separatedUrl = req.url.split("/");
  const id = separatedUrl[separatedUrl.length - 1];

  const status = await Book.findByIdAndDelete(id);

  if (status) {
    res.writeHead(200, header);
    res.end(
      JSON.stringify({ message: `book with ${id} is deleted succssfully` })
    );
  } else {
    notFound(req, res, "Book not found");
  }
};

const updateBook = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));

  req.on("end", async () => {
    const splittedUrl = req.url.split("/");
    const id = splittedUrl[splittedUrl.length - 1];

    const bookData = JSON.parse(body);
    const validatedBook = updateBookValidator(bookData);

    if (validatedBook?.isValid) {
      const status = await Book.findByIdAndUpdate(id, bookData, { new: true });

      if (!status)
        return notFound(req, res, `Bookd not found at ${id} to update`);

      res.writeHead(200, header);
      res.end(
        JSON.stringify({
          success: true,
          message: "Book update successfully",
        })
      );
    } else {
      notFound(req, res, `Book not found at ${id} for update`);
    }
  });
};

module.exports = {
  getBooks,
  getBook,
  addBook,
  deleteBook,
  updateBook,
};
