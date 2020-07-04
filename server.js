const http = require('http');

const hostname = 'localhost';
const port = 3000;

const path = require('path');
const fs = require('fs');

//You don't create the http request, it is onlly received
const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url} by method ${req.method}`);


  
  if (req.method === 'GET') {
    let fileUrl = req.url;
    if (fileUrl === '/') {
        fileUrl = '/index.html';
    }

    //Changing relative path to absolute path
    const filePath = path.resolve('./public' + fileUrl);

    //Getting the requests for html files only:
    const fileExt = path.extname(filePath);

    if (fileExt === '.html') {
        //Is this file accessible? Checks path and error object is passed if error is truthy
        fs.access(filePath, err => {
            if (err) {
                res.statusCode = 404;
                //Anytime html is send in the body; the header should be set just like this:
                res.setHeader('Content-Type', 'text/html');
                //When body is short; you can simply include it in the res.end instead of creating a res.write
                res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                //response is now completed and the info will be sent back to the client

                //return statement so that the code after this is not executed.
                return;
            }
            //No errors. Get request for an html file. The html file exists on the server inside a public directory. SUCCESS!:
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');

            //Reads contents of the file it's given in small chunks, rather than all at once. This way it doesn't load the whole file into memory; just a chunk at a time. Very similar to "lazy loading" in React Native with FlatLists.

            //Contents are being piped; sending it over to the response object. (Pipe method sends info from one stream to the other.)
            
            //Piping from reading the file at this filepath to the response stream, so the response object can now access that data.

            fs.createReadStream(filePath).pipe(res);
            //No need to add res.end since createReadStream causes the response object to end by default after it's finished reading from the file.
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
    }
} else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
}
});

server.listen(port, hostname, () => {
    //executed when the server starts:
    console.log(`Server running at http://${hostname}:${port}/`);
});