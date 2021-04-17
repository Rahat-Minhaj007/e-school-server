const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a4w6n.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5055;




app.get('/', (req, res) => {
  res.send('Hello World!')
})



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {

    console.log('connection error', err);
  const serviceCollection = client.db("serviceStore").collection("service");
  const orderCollection = client.db("serviceStore").collection("order");
  const reviewCollection = client.db("serviceStore").collection("review");
  const adminEmailCollection = client.db("serviceStore").collection("email");


  


  app.get('/order',(req,res) => {
    orderCollection.find()
    .toArray((err,orderItems) => {
        res.send(orderItems)
       
    })
})

app.get('/review',(req,res) => {
    reviewCollection.find()
    .toArray((err,reviewItems) => {
        res.send(reviewItems)
       
    })
})

app.get('/course',(req,res) => {
    serviceCollection.find()
    .toArray((err,courseItems) => {
        res.send(courseItems)
       
    })
})


app.get('/email',(req,res) => {
    adminEmailCollection.find()
    .toArray((err,emailItems) => {
        res.send(emailItems)
       
    })
})



  app.post('/addOrder',(req,res) => {
    const order = req.body;
    console.log('adding new order',order);
    orderCollection.insertOne(order)
    .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
    })
})


app.post('/addReview',(req,res) => {
    const review = req.body;
    console.log('adding new order',review);
    reviewCollection.insertOne(review)
    .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
    })
})

app.post('/addCourse',(req,res) => {
    const course = req.body;
    console.log('adding new order',course);
    serviceCollection.insertOne(course)
    .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
    })
})


app.post('/addEmail',(req,res) => {
    const email = req.body;
    console.log('adding new order',email);
    adminEmailCollection.insertOne(email)
    .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
    })
})



app.delete('/delete/:id',(req,res) => {
    serviceCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then(result => {
        
        console.log(result);
    })
})


  
});


app.listen(port)