/// <reference path = "./typings/tsd.d.ts" />
var routes = require("./routes/generalRoutes");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");
var app = express();
var port = process.env.port | 8000;
var staticFilesPath = path.resolve(__dirname, "./static");
app.use(cors());
app.use(express.static(staticFilesPath));
app.use(bodyParser.json());
app.use("/api", routes);
app.listen(port, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("server started on port " + port);
    }
});
