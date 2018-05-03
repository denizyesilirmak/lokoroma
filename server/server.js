// MODULE DEPENDENCIES
var express = require('express');
const dburl = require('./config/db')
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var ObjectID = mongodb.ObjectID;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

var db;
mongodb.MongoClient.connect(dburl.url, function (err, database) {
        if (err) {
                console.log(err);
                process.exit(1);
        }
        db = database.db('lokoroma');
        console.log("Database connection ready.")
})


function userExist(req, res, next) {
        db.collection("users").count({
                username: req.body.username
        }, function (err, count) {
                if (count === 0) {
                        next();
                } else {

                        console.log("user exist")
                }
        });
}

app.post('/register',userExist, (req, res) => {
        var newUser = {
                "username": req.body.username,
                "password": req.body.password,
                "name": req.body.name,
        }

        db.collection("users").insertOne(newUser, function (err, doc) {
                if (err) {
                        console.log(err)
                } else {
                        res.status(201).json(doc.ops[0]);
                }
        });
        // res.send("deneme");
})








app.listen(3000, function () {
        console.log("Express server listens port 3000");
})