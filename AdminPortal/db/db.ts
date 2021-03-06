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

let productsSchema = new mongoose.Schema({
    name: {type: String},
    price: {type: Number},
    firebaseToken: {type: String};
});

let orderSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    sentBy: String,
    recievedOn: {type: Date},
    deliveredOn: {type: Date, default: Date.now()},
    firebaseToken: String,
})

let userModel = mongoose.model("users", userSchema);
let companyModel = mongoose.model("companies", newCompanySchema);
let addSalesmanModel = mongoose.model("salesmen", addSalesmanSchema);
let addProductsModel = mongoose.model("products", productsSchema);
let orderModel = mongoose.model("orders", orderSchema);

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
        if(data.length == 0){
            console.log("no salesman found")     
        } else if(err){
            deferred.reject(err)
        } else{
            console.log(data)
            deferred.resolve(data);
        }
    })
    
    return deferred.promise;
        
}

function getDataAgain(arg){
    
    let defferred = q.defer();
    
    userModel.findOne(arg, (err, data)=>{
       if(err){
           defferred.reject(err);
       } else {
          defferred.resolve(data);   
       }
       
    })
    return defferred.promise;
}

function salesmenLogin(arg){
    let deferred = q.defer();
    
    addSalesmanModel.findOne(arg, (err, data)=>{
        if(err){
            deferred.reject(err)
        }else{
            deferred.resolve(data)
        }
    })
    
    return deferred.promise;
}

function addProduct(args){
    let product = new addProductsModel(args);
    let deferred = q.defer();
    
    product.save((err, data)=>{
        if(err){
            deferred.reject(err)
        }else{
            deferred.resolve(data)
        }
    })
    
    return deferred.promise;
}

function getProducts(args){
    let deferred = q.defer();
    
    addProductsModel.find(args, (err, data)=>{
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(data);
        }
        
       
    })
     return deferred.promise;
}

function saveOrder(args){
    let order = new orderModel(args)
    let deferred = q.defer();
    
    order.save((err, data)=>{
        if(err){
            deferred.reject(err)
        }else{
            deferred.resolve(data)
        }
    })
    
    return deferred.promise;
}

export {saveUser, login, createCompany, findCompany, addSalesman, findSalesmen, getDataAgain, salesmenLogin, addProduct, getProducts, saveOrder