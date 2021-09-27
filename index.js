// Library Imports
const http = require('http');
   
const PORT_ADDR = 8000;
const LOCALHOST = '127.0.0.1'
   
var server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" }); // HTTP header
  response.end('Welcome to the Server')
});


  server.listen(PORT_ADDR, LOCALHOST, () => {
    console.log(`Server is running at ${LOCALHOST}:${PORT_ADDR}`);
  });