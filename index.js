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
    const reviewUserCollection = client.db("digitalService").collection("userReview");
    const addProduct = client.db("digitalService").collection("addService");
    const userOrderCollection = client.db("digitalService").collection("userorder");
    const adminListCollection = client.db("digitalService").collection("adminList");

    // Post addServices
    app.post('/addServices',  (req, res) =>{
      addProduct.insertOne(req.body)
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

    // Post payment
    app.post('/payment', (req, res)=>{
      userOrderCollection.insertOne(req.body)
      .then(result=>{
          res.send(result.insertedCount>0)
      })
      .catch(err=>{
          console.log(err, "error Massege")
      })
    })
    // Post AdminList
    app.post('/addAdmin', (req, res)=>{
      adminListCollection.insertOne(req.body)
      .then(result=>{
          res.send(result.insertedCount>0)
          console.log(result)
      })
      .catch(err=>{
          console.log(err, "error Massege")
      })

    })

    // Get productServices
      app.get('/productServices', (req, res)=>{
        addProduct.find({})
        .toArray((err, documents)=>{
          res.send(documents)          
          
        })
        
      })
      app.post('/checkAdmin', (req, res)=>{
        adminListCollection.find({email:req.body.email})
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

    // Get byProduct
    app.get("/buyProduct/:id", (req, res) => {

      addProduct.find({ _id: ObjectID(req.params.id) })
        .toArray((err, documents) => {
          res.send(documents[0])
        })
        
    })

    // Get UserOrder list
    app.get('/bookingList', (req, res) =>{
      userOrderCollection.find({})
      .toArray((err, documents)=>{
          res.send(documents)
      })
    })

    // Get OrderList
    app.get('/orderList', (req, res) =>{
      userOrderCollection.find({})
      .toArray((err, documents)=>{
          res.send(documents)
      })
    })

    // Get OrderList
    app.get('/manageProduct', (req, res) =>{
      addProduct.find({})
      .toArray((err, documents)=>{
          res.send(documents)
      })
    })
    
  });


  // delete mathod
  app.delete('/delete/:id', (req, res) => {
    console.log(req.params.id) 
   
    addProduct.deleteOne({ _id: ObjectID(req.body.id) }) 
  
     .then(result=>{
       console.log(result)

      // res.send(result.deletedCount>0)
      
     })
     .catch(err=>{
       console.log(err)
     })
      
  })



  app.listen(port, () => {
    console.log("successfully digital server site");
});