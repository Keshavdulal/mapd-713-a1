/**
 * MAPD 713 Enterprise Tech
 * Assignment 1 - Node Server Demo
 * Develop Node.js http server to store, retrieve and delete information about images using
 * HTTP GET, POST and DELETE requests and JSON data format.
 *
 * Author      : Keshav Dulal
 * Student ID  : 301209947
 * Email       : kdulal1@my.centennialcollege.ca
 */

// Library Imports
const http = require("http");

const PORT_ADDR = 8000;
const LOCALHOST = "127.0.0.1";

// let inMemoryImagesData = [];
let inMemoryImagesData = [
  {
    imageId: 123,
    name: "Candle",
    url: "http://candle.cloud.com",
    size: "500kb",
  },
];

var server = http.createServer(function (request, response) {
  // handle different request urls using switch
  switch (true) {
    case request.url == "/" && request.method == "GET":
      response.writeHead(200, { "Content-Type": "text/plain" }); // HTTP header
      response.end("Welcome to the Server");
      break;

    case request.url == "/images" && request.method == "GET":
      if (inMemoryImagesData.length == 0) {
        // Respond for empty Image Array
        response.writeHead(200, { "Content-Type": "text/plain" }); // HTTP header
        response.end("No Images found");
      } else {
        // Return a valid image array
        response.writeHead(200, { "Content-Type": "application/json" }); // HTTP header
        const responsePayload = { data: inMemoryImagesData };
        response.end(JSON.stringify(responsePayload));
      }
      break;
  }
});

server.listen(PORT_ADDR, LOCALHOST, () => {
  console.log(`\nServer is listening at ${LOCALHOST}:${PORT_ADDR}`);
  console.log(`\nEndpoints:`);
  console.log(`${LOCALHOST}:${PORT_ADDR}/images method: GET, POST`);
});
