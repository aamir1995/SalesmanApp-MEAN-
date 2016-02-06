/// <reference path="../typings/tsd.d.ts" />
var express = require("express");
var mongoose = require("mongoose");
var q = require("q");
var dbUrl = "mongodb://aamirshah:zombiedude688@ds039860.mongolab.com:39860/salesmanapp101";
mongoose.connect(dbUrl);
// when connection is successfully created
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbUrl);
});
// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});
// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});
var userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    createdOn: { type: Date, default: Date.now() },
    firebaseToken: { type: String }
});
var newCompanySchema = new mongoose.Schema({
    companyName: { type: String },
    products: { type: String },
    address: { type: String },
    adminId: { type: String }
});
var userModel = mongoose.model("users", userSchema);
var companyModel = mongoose.model("companies", newCompanySchema);
function saveUser(args) {
    var defferred = q.defer();
    var user = new userModel(args);
    user.save(function (err, data) {
        if (err) {
            console.log(err);
            defferred.reject("error");
        }
        else {
            console.log("succesfully added (db)");
            defferred.resolve(data);
        }
    });
    return defferred.promise;
}
exports.saveUser = saveUser;
function login(arg) {
    var defferred = q.defer();
    userModel.findOne(arg, function (err, data) {
        if (err) {
            console.log(err);
            defferred.reject("Incorrect Email");
        }
        else {
            defferred.resolve(data);
        }
    });
    return defferred.promise;
}
exports.login = login;
function createCompany(arg) {
    var company = new companyModel(arg);
    var defferred = q.defer();
    company.save(function (err, success) {
        if (err) {
            console.log(err);
            defferred.reject("something went wrong");
        }
        else {
            defferred.resolve(success);
        }
    });
    return defferred.promise;
}
exports.createCompany = createCompany;
