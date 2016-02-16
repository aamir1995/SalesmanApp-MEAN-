/// <reference path="../typings/tsd.d.ts" />
let express= require("express");
let mongoose = require("mongoose");
let q = require("q");

let dbUrl = "mongodb://aamirshah:zombiedude688@ds039860.mongolab.com:39860/salesmanapp101"
mongoose.connect(dbUrl);

// when connection is successfully created
mongoose.connection.on('connected', ()=>{
    console.log('Mongoose default connection open to ' + dbUrl);
});
// If the connection throws an error
mongoose.connection.on('error', (err)=>{
    console.log('Mongoose default connection error: ' + err);
});
// When the connection is disconnected
mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose default connection disconnected');
});


let userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String, unique: true},
    password:{type: String},
    createdOn: {type: Date, default:Date.now()},
    firebaseToken: {type: String}
});

let newCompanySchema = new mongoose.Schema({
    companyName: {type: String},
    products: {type: String},
    address: {type: String},
    adminId: {type: String}
})

let addSalesmanSchema = new mongoose.Schema({
    name: {type: String},
    region: {type: String},
    id: {type: String},
    password: {type: String},
    uniqueId: {type: String}
})


let userModel = mongoose.model("users", userSchema);
let companyModel = mongoose.model("companies", newCompanySchema);
let addSalesmanModel = mongoose.model("salesmen", addSalesmanSchema);


function saveUser(args){
    let defferred = q.defer();
    let user = new userModel(args);
    
    user.save((err, data)=>{
        if(err){
            console.log(err);
            defferred.reject("error");
           
        } else {
            console.log("succesfully added (db)");
            defferred.resolve(data);
        }
       
    })
     return defferred.promise;
}

function login(arg){
    let defferred = q.defer();
    userModel.findOne(arg, (err, data)=>{
       if(err){
           console.log(err);
           defferred.reject("Incorrect Email");
       } else {
          defferred.resolve(data);   
       }
       
    });
    return defferred.promise;
}

function createCompany(arg){
    
    let company = new companyModel(arg);
    let defferred  = q.defer();
    
    company.save((err, success)=>{
        if(err){
            console.log(err);
            defferred.reject("something went wrong");
        }else{
            defferred.resolve(success); 
        }
        
    })
    return defferred.promise;
    
}

function findCompany(arg){
    let defferred = q.defer();
    
    companyModel.findOne(arg, (err, data)=>{
        if(err){
            console.log("no company found");
            defferred.reject(err);
        }else if(!data){
            console.log("no company found");
            
        }else{
            console.log("successfully found company "+data);
            defferred.resolve(data);
        }
    })
    return defferred.promise;
}

function addSalesman(arg){
    let salesmen = new addSalesmanModel(arg);
    let deferred = q.defer();
    
    salesmen.save((err, success)=>{
        if(err){
            console.log("error in creating new salesman " + err);
            deferred.reject(err);
        }else{
            console.log("successfully created new Salesman", + success);
            deferred.resolve(success);
        }
    })
    
    return deferred.promise;    
}

function findSalesmen(arg){
    let deferred = q.defer();
    
    addSalesmanModel.find(arg, (err, data)=>{
        if(err){
            console.log(err)
        }if else(!data){
            console.log("no salesman found");
        }else{
            console.log(data);
        }
    })
        
}

export {saveUser, login, createCompany, findCompany, addSalesman}