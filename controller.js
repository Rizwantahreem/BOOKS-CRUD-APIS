const BookType = require("./interfaces.js");
const booksData = require("./books-db.js");

const header = { "Content-Type": "application/json" };

function ValidateBook(book) {
  for (const key in BookType) {
    if (!book[key]) return false;
  }
  return true;
}

function keysChecker(bookUpdate) {
  for (const key in bookUpdate) {
    if (!BookType[key]) return false;
  }
  return true;
}

function getBooks(req, res) {
  res.writeHead(200, header);
  res.end(JSON.stringify(booksData));
}

function getBook(req, res) {
  const splittedUrl = req.url.split("/");
  const isbn = splittedUrl[splittedUrl.length - 1];
  const book = booksData.filter((book) => book.isbn == isbn);

  if (book.length > 0) {
    res.writeHead(200, header);
    res.end(JSON.stringify(book));
  } else {
    notFound(req, res, "book(s) not found");
  }
}

function addBook(req, res) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    const book = JSON.parse(body); // change recieve string to json

    if (ValidateBook(book)) {
      booksData.push(book);
      res.writeHead(200, header);
      res.end(JSON.stringify(book));
    } else {
      notFound(req, res, "Book data is not correct");
    }
  });
}

function notFound(req, res, errorMsg = "") {
  res.writeHead(404, header);
  res.end(JSON.stringify({ error: errorMsg || "Not Found" }));
}

function deleteBook(req, res) {
  const separatedUrl = req.url.split("/");
  const isbn = separatedUrl[separatedUrl.length - 1];
  const book = booksData.filter((book) => book.isbn == isbn);

  if (book.length > 0) {
    res.writeHead(200, header);
    res.end(JSON.stringify({ message: "book is deleted succssfully" }));
  } else {
    notFound(req, res, "Book not found");
  }
}

function updateBook(req, res) {
  let body = "";

  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    const splittedUrl = req.url.split("/");
    const isbn = splittedUrl[splittedUrl.length - 1];

    const bookIdx = booksData.findIndex((book) => book.isbn == isbn);
    if (bookIdx != -1) {
      let updatedBook;
      const bookData = JSON.parse(body);
      if (keysChecker(bookData)) {
        updatedBook = { ...booksData[bookIdx], ...bookData };
      }
      booksData[bookIdx] = updatedBook;
      res.writeHead(200, header);
      res.end(
        JSON.stringify({
          book: booksData[bookIdx],
          message: "book update successfully",
        })
      );
    } else {
      notFound(req, res, "Book not found");
    }
  });
}

module.exports = {
  getBooks,
  getBook,
  addBook,
  notFound,
  deleteBook,
  updateBook,
};
