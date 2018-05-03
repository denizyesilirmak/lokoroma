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

app.listen(3000, function () {
        console.log("Express server listens port 3000");
})


async function userExistsInDB(username, password) {
        try {
                let collection = db.collection('users');
                let userCount = (await collection.find({
                        username: username
                }).limit(1).count());
                return userCount > 0;
        } finally {
        }
}


app.post("/register", async function (req, res) {
        var newUser = {
                "username": req.body.username,
                "password": req.body.password,
                "name": req.body.name,
        }
        let result = await userExistsInDB(req.body.usernam);

        if (await result) {
                console.log("eksik");
                process.exit(1);

                
        }

        await db.collection("users").insertOne(newUser, function (err, doc) {
                if (err) {
                        console.log(err)
                } else {
                        res.status(201).json(doc.ops[0]);
                }
        });
})

app.get('/', (req, res) => {

        db.collection('users').count({"username": "de3niz"})
        db.collection('users').find({"username": "de3niz"}).toArray(function (err, users) {
                if (err) throw err
                if(users){
                        res.send(users)
                }
        })
})


// var getName = async () =>{
//         var isim = "deniz "
//         var soyisim = "yeşilırmak"
//         for(var i = 0; i<100000; i++){
//                 console.log("a")
//         }
//         return isim + soyisim
// }

// app.get('/', async (req, res)=>{
//         var name = await getName();
//         res.send(name);
// })

