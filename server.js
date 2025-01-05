const http = require("http");
const routes = require("./routes");

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  routes.handleRequests(req, res);
});

server.listen(PORT, () => {
  console.log(`server is listening... at ${PORT}`);
});
