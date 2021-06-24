const express=require("express");
const bodyParser=require('body-parser');
const cors =require ('cors')

const port=5000;

const app =express();

app.use(cors());
app.use(bodyParser.json());


const MongoClient= require('mongodb').MongoClient;

const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n1i4v.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

require('dotenv').config



app.get('/',(req,res)=>{
    res.send ("Hello from Db , I am working")
})


client.connect(err => {
  const users = client.db("jobDb").collection("users");
  

  app.post('/addJob',(req,res)=>{
    const addJob=req.body;
    users.insertOne(addJob)
    .then(result=>{
      res.send(result.insertedCount>0);
    })
    console.log(addJob);

  })

  app.get('/jobs',(req,res)=>{
    console.log(req.query.email);
    users.find({})
    .toArray((err,documents)=>{
      res.send(documents);
    })
  })
 
});


app.listen(process.env.PORT || port);