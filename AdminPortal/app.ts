/// <reference path = "./typings/tsd.d.ts" />

let routes = require("./routes/generalRoutes");


import express = require("express");
import bodyParser = require("body-parser");
import path = require("path");


let app = express();
let port = process.env.port | 8000;
let staticFilesPath = path.resolve(__dirname, "./static");


app.use(express.static(staticFilesPath));
app.use(bodyParser.json());
app.use("/api", routes);


app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("server started on port " + port);
    }
});