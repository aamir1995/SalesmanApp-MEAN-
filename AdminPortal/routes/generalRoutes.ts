/// <reference path = "../typings/tsd.d.ts" />

import {
    saveUser, login, createCompany, findCompany, addSalesman, findSalesmen, getDataAgain, salesmanLogin
}
from "../db/db";
import express = require("express");
import firebase = require("firebase");

let ref = new firebase("https://salesmanapp101.firebaseio.com");

let router = express.Router();

router.post("/signup", (req: express.Request, res: express.Response) => {

    ref.createUser({
            email: req.body.data.email,
            password: req.body.data.password
        }, (err, success) => {
            if (err) {
                res.send(err);
            } else {
                req.body.data.firebaseToken = success.uid;
                saveUser(req.body.data)
                    .then((data) => {
                        console.log("successfully added ", data + " (generalRoutes)");
                        res.send({
                            success: true,
                            data: data
                        });
                    }, (err) => {
                        console.log("err", err);
                        res.send({
                            success: false,
                            data: err
                        });
                    }));
        };
    }

});

router.post("/login", (req: express.Request, res: express.Response) => {
let user = req.body.data;

login({email: user.email})
    .then((data) => {
            if (!data) {
                console.log("Incorrect Email");
                res.send({success: false});
                return;
            } else {
                if (user.password == data.password) {
                    console.log("successfully logged in", data);
                    res.send({token: data.firebaseToken,userName: data.name});                       
                } else {
            console.log("incorrect passsword");
            res.send({success: false});
        };
    }
}
), (err) => {res.send(err);
        }
});

router.post("/newCompany", (req: express.Request, res: express.Response) => {
    //console.log(req.body);
    createCompany(req.body)
        .then((data) => {
            console.log(data, "successfully created your company");
            res.send(data);
        }, (err) {
            console.log(err, "error in creating company");
            res.send(err);
        });

});

router.get("/userProfile", (req: express.Request, res: express.Response) => {
        

});

router.get("/getSalesmanInfo", (req: express.Request, res: express.Response)=>{
    findSalesmen({uniqueId: req.query.token})
                .then((data)=>{
                    console.log(data);
                    res.send(data);
                }, (err)=>{
                    console.log(err);
                    res.send(err);
                })
});


router.get("/getCompanyInfo", (req: express.Request, res: express.Response) => {
            console.log(req.query.token);
            findCompany({
                    adminId: req.query.token
                })
                .then((data) => {
                    
                    res.send(data);
                }, (err) => {
                    console.log(err, "err in fetching company data");
                    res.send(err);
                })
);

router.post("/newSalesman", (req: express.Request, res: express.Response)=>{
    
    console.log(req.body)
    addSalesman(req.body)
        .then((data)=>{
            res.send(data);
        }, (err)=>{
            res.send(err);
        });
});

router.get("/getUserDataAgain", (req: express.Request, res: express.Response)=>{
   
    
    getDataAgain({firebaseToken: req.query.token})
        .then((data)=>{
           // console.log("new data ",data)
            res.send(data.name);
        }, (err)=>{
            console.log(err);
        })
})

router.post("/salesmaLogin", (req: express.Request, res: express.Response)=>{
    let user = req.body
    
    salesmanLogin({email : req.body.email})
        .then((data)=>{
            console.log(data)
            res.send(data)
        }, (err){
            res.send(err)
        });
})
    

module.exports = router;