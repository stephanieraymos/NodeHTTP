const http = require('http');

const hostname = 'localhost';
const port = 3000;

//You don't create the http request, it is onlly received
const server = http.createServer((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    //Anytime html is send in the body; the header should be set just like this:
    res.setHeader('Content-Type', 'text/html');
    //When body is short; you can simply include it in the res.end instead of creating a res.write
    res.end('<html><body><h1>Hello, World!</h1></body></html>');
    //response is now completed and the info will be sent back to the client
});

server.listen(port, hostname, () => {
    //executed when the server starts:
    console.log(`Server running at http://${hostname}:${port}/`);
});