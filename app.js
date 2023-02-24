const http = require("http");

const { PORT = 3000 } = process.env;

const server = http.createServer(() => {
  console.log("Пришёл запрос!");
});

server.listen(PORT);
