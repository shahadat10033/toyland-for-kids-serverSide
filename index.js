const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ddxd88y.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const dbCollection = client.db("ToysDB").collection("toys");

    app.get("/toys", async (req, res) => {
      const limit = 20;
      const result = await dbCollection.find().limit(limit).toArray();

      res.send(result);
    });
    app.get("/myToys", async (req, res) => {
      console.log(req.query.sellerEmail);
      let query = {};
      if (req.query?.sellerEmail) {
        query = { sellerEmail: req.query.sellerEmail };
      }
      const result = await dbCollection.find(query).toArray();

      res.send(result);
    });
    app.get("/descendingToys", async (req, res) => {
      console.log(req.query.sellerEmail);
      let query = {};
      if (req.query?.sellerEmail) {
        query = { sellerEmail: req.query.sellerEmail };
      }

      const options = {
        sort: { price: -1 },
      };

      const result = await dbCollection.find(query, options).toArray();

      res.send(result);
    });
    app.get("/ascendingToys", async (req, res) => {
      console.log(req.query.sellerEmail);
      let query = {};
      if (req.query?.sellerEmail) {
        query = { sellerEmail: req.query.sellerEmail };
      }

      const options = {
        sort: { price: 1 },
      };

      const result = await dbCollection.find(query, options).toArray();

      res.send(result);
    });

    app.post("/toys", async (req, res) => {
      const newToy = req.body;
      const result = await dbCollection.insertOne(newToy);
      res.send(result);
    });

    app.get("/toyName", async (req, res) => {
      // const subCategory = req.params.subCategory;
      console.log(req.query.toyName);
      let query = {};
      if (req.query?.toyName) {
        query = { toyName: req.query.toyName };

        console.log(query);
      }
      const result = await dbCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/toys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await dbCollection.findOne(query);
      res.send(result);
    });
    app.get("/subCategory", async (req, res) => {
      // const subCategory = req.params.subCategory;
      console.log(req.query.subCategory);
      let query = {};
      if (req.query?.subCategory) {
        query = { subCategory: req.query.subCategory };
      }
      const result = await dbCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/toys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await dbCollection.deleteOne(query);
      res.send(result);
    });
    app.put("/toys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updatedToy = req.body;

      const updateDoc = {
        $set: {
          price: updatedToy.price,
          quantity: updatedToy.quantity,
          description: updatedToy.description,
        },
      };

      const result = await dbCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from kids toyLand server!");
});

app.listen(port, () => {
  console.log(` kids toyLand  is running on port ${port}`);
});
