const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

const { MongoClient } = require("mongodb");

// Middle wire 
app.use(cors());
app.use(express.json());

// mongoDB user: shopno-bazar
// mongoDB password: kb0JG5gMStVmuv3V

// Connection URI
const uri ="mongodb+srv://shopno-bazar:kb0JG5gMStVmuv3V@cluster0.0ez4m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    const database = client.db("shopno-bazar");
    const products = database.collection('products');
    console.log("Connected successfully to server");

    //start CRUD (get, post, put, delete) operation ======================
    
    //POSR or Create products -------------------
    app.post('/products', async( req, res)=>{
        const newProduct = req.body;
        const result = await products.insertOne(newProduct);
        res.json(result)
    })


    //end CRUD operation ========================

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





// initial testing of server 
app.get("/", (req, res) => {
    res.send("server srarted on port")
})

//server listener
app.listen(port, ()=>{
    console.log('server is runing on', port)
})

// Others LINKs 
// https://docs.mongodb.com/drivers/node/current/