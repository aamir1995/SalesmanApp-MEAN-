/// <reference path = "../typings/tsd.d.ts" />
var db_1 = require("../db/db");
var express = require("express");
var firebase = require("firebase");
var ref = new firebase("https://salesmanapp101.firebaseio.com");
var router = express.Router();
router.post("/signup", function (req, res) {
    ref.createUser({
        email: req.body.data.email,
        password: req.body.data.password
    }, function (err, success) {
        if (err) {
            res.send(err);
        }
        else {
            req.body.data.firebaseToken = success.uid;
            db_1.saveUser(req.body.data)
                .then(function (data) {
                console.log("successfully added ", data + " (generalRoutes)");
                res.send({ success: true, data: data });
            }, function (err) {
                console.log("err", err);
                res.send({ success: false, data: err });
            });
        }
    });
});
;
router.post("/login", function (req, res) {
    var user = req.body.data;
    db_1.login({ email: user.email })
        .then(function (data) {
        if (!data) {
            console.log("Incorrect Email");
            res.send({ success: false });
            return;
        }
        else {
            if (user.password == data.password) {
                console.log("successfully logged in", data);
                //res.send({token : data.firebaseToken, userName: data.name});
                var obj1 = { token: data.firebaseToken, userName: data.name };
                db_1.findCompany({ adminId: data.firebaseToken })
                    .then(function (data) {
                    //res.send(data);
                    res.json({ success: true, data: data, "token": obj1, "msg": "got data" });
                    console.log(data);
                }, function (err) {
                    console.log("err in fetching company data from Database ", err);
                });
            }
            else {
                console.log("incorrect passsword");
                res.send({ success: false });
            }
            ;
        }
    }), function (err) {
        res.send(err);
    };
});
router.post("/newCompany", function (req, res) {
    //console.log(req.body);
    db_1.createCompany(req.body)
        .then(function (data) {
        console.log(data, "successfully created your company");
        res.send(data);
    }, function (err) {
        console.log(err, "error in creating company");
        res.send(err);
    });
});
router.post("/userProfile", function (req, res) {
});
module.exports = router;
