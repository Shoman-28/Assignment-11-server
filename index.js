const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json())
require('dotenv').config()
const MongoClient = require("mongodb").MongoClient;
const ObjectID=require("mongodb").ObjectID
const port = process.env.PORT || 4500;

app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hmpjo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const addProductCollection = client.db("digitalService").collection("addService");
    const reviewUserCollection = client.db("digitalService").collection("userReview");
   

    // Post addServices
    app.post('/addServices',  (req, res) =>{
        addProductCollection.insertOne(req.body)
        .then(result=>{
        res.send(result.insertedCount>0)
        })
        .catch(err=>{
          console.log(err)
        })
        
      })

    // Post User Review
    app.post('/userReview', (req, res) =>{
        reviewUserCollection.insertOne(req.body)
        .then(result=>{
            res.send(result.insertedCount>0)
        })
        .catch(err=>{
            console.log(err, "error Massege")
        })
    })

    // Get productServices
      app.get('/productServices', (req, res)=>{
        addProductCollection.find({})
        .toArray((err, documents)=>{
          res.send(documents)          
          
        })
        
      })

    // Get Testimonials
    app.get('/testimonials', (req, res) =>{
        reviewUserCollection.find({})
        .toArray((err, documents)=>{
            res.send(documents)
        })
    })
  });



  app.listen(port, () => {
    console.log("successfully digital server site");
});