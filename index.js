const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello, world!');
});

server.listen(8080, '127.0.0.1', () => {
  console.log('Server is listening to port 8080');
});
