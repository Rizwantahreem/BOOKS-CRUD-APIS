const notFound = (req, res, errorMsg = "") => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: errorMsg || "Not Found" }));
};

module.exports = notFound;
