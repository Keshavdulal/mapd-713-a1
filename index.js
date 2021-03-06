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

// Counters for GET & POST requests
let getRequestCounter = 0;
let postRequestCounter = 0;

let inMemoryImagesData = [];

var server = http.createServer(async function (request, response) {
  // log requests endpoints and methods used
  console.log(
    `\nRequest URL → ${request.url}\nRequest Method → ${request.method}`
  );

  // handle different request urls using switch
  switch (true) {
    case request.url == "/" && request.method == "GET":
      ++getRequestCounter;
      response.writeHead(200, { "Content-Type": "text/plain" }); // HTTP header
      response.end("Welcome to the Server");
      break;

    case request.url == "/images" && request.method == "GET":
      ++getRequestCounter;
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

    // Handle JSON Payload
    case request.url == "/images" && request.method == "POST":
      ++postRequestCounter;
      // Reference: https://nodejs.dev/learn/get-http-request-body-data-using-nodejs
      const buffers = [];
      for await (const chunk of request) {
        buffers.push(chunk);
      }
      const data = JSON.parse(Buffer.concat(buffers).toString());

      inMemoryImagesData = [...inMemoryImagesData, data];
      response.end("Data stored in memory");
      break;

    // Delete images
    case request.url == "/images" && request.method == "DELETE":
      inMemoryImagesData = [];
      response.end("All images deleted from memory");
      break;
  }

  console.log(
    `Processed Request Count--> Get:${getRequestCounter}, Post:${postRequestCounter}`
  );
});

server.listen(PORT_ADDR, LOCALHOST, () => {
  console.log(`\nServer is listening at ${LOCALHOST}:${PORT_ADDR}`);
  console.log(`\nEndpoints:`);
  console.log(`${LOCALHOST}:${PORT_ADDR}/ method: GET`);
  console.log(`${LOCALHOST}:${PORT_ADDR}/images method: GET, POST, DELETE`);
});
