/// <reference path = "../typings/tsd.d.ts" />

import {saveUser, login, createCompany} from "../db/db";
import express = require("express");
import firebase = require("firebase");

let ref = new firebase("https://salesmanapp101.firebaseio.com");

let router = express.Router();

router.post("/signup", (req:express.Request, res:express.Response)=>{
    
    ref.createUser({
       email: req.body.data.email,
       password: req.body.data.password 
    },(err, success)=>{
        if(err){
            res.send(err);
        }else{ 
            req.body.data.firebaseToken = success.uid;
            saveUser(req.body.data)
                .then((data)=>{
                   console.log("successfully added ", data+" (generalRoutes)");
                     res.send({success:true, data:data});
                }, (err)=>{
                    console.log("err", err);
                     res.send({success:false, data:err});
                }
                ));
                };}
    
 });
 
 router.post("/login", (req:express.Request, res:express.Response)=>{
     let user = req.body.data;
     
     login({email : user.email})
        .then((data)=>{
            if(!data){
                console.log("Incorrect Email");
                res.send({success: false});
                return;
            }  else {
             if(user.password == data.password){
                 console.log("successfully logged in");
                 res.send({token : data.firebaseToken, userName: data.name});
                 console.log(data)
                 console.log(data.firebaseToken);
                 login({adminId: user.firebaseToken})
                    .then((companyData)=>{
                        console.log(companyData, "new company data");
                        res.send(companyData)
                    }),(err){
                        console.log(err);
                    }
                 } else {
                     console.log("incorrect passsword");
                     res.send({success: false});
                 };   
            }
        }), (err){
            res.send(err);
        }
     });
     
     router.post("/newCompany", (req:express.Request, res:express.Response)=>{
         
        
         createCompany(req.body.data)
            .then((data)=>{
                console.log(data, "successfully created your company");
                res.send(success: true, data: data)
            },(err){
                console.log(err, "errorr in creating company");
                res.send(success: false, data:err);
            }
            );
            
     })


module.exports = router;