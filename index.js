// const express = require("express"); // 3rd party package installed
import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

console.log(process.env.MONGO_URL);

const app = express(); // called imported package express we will get app

const PORT = 4000;

// Connection

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL); // dial
await client.connect(); // calling
console.log("Mongo is Connected");

// we should use middleware to intimate our data is Json

// MiddleWare is express.json() => convert json to javascript.It is an inbuilt middleware
app.use(express.json());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩✨✨✨✨✨✨✨HELLO WORLD  !!!");
});

// link http://localhost:4000

// task - 1 http://localhost:4000/movies

// app.get("/movies", function (request, response) {
//   response.send(movies);
// });

// task-2 http://localhost:4000/movies/99

// GET movies using POSTMAN & FindOne
app.get("/movies/:id", async function (request, response) {
  const { id } = request.params;
  // db.movies.findOne({ id: 99 });
  // const movie = movies.find((mv) => mv.id == id);
  const movie = await client
    .db("b40wd")
    .collection("movies")
    .findOne({ id: id });
  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ Message: "Moive Not found" });
});

// POST(create) movies using POSTMAN // post => request

app.post("/movies", async function (request, response) {
  const data = request.body;
  console.log(data);
  //db.movies.insertMany(data);
  const result = await client.db("b40wd").collection("movies").insertMany(data);

  // movie
  //   ? response.send(movies)
  //   : response.status(404).send({ Message: "Movie not found" });
  response.send(result);
});

// FIND ALL movies form DB

// app.get("/movies", async function (request, response) {
//   //db.movies.find({})

//   // cursor = > Pagination | cursor => Array => toArray
//   const movies = await client
//     .db("b40wd")
//     .collection("movies")
//     .find({})
//     .toArray();
//   console.log(movies);

//   response.send(movies);
// });

// DELETE moives

app.delete("/movies/:id", async function (request, response) {
  const { id } = request.params;

  //db.movies.deleteOne({id:id})
  const result = await client
    .db("b40wd")
    .collection("movies")
    .deleteOne({ id: id });
  console.log(result);
  result.deletedCount > 0
    ? response.send({ Message: "Movie Deleted Successfuly" })
    : response.status(404).send({ Message: "Movie not Found" });
});

// PUT Method (movies) UPDATE

app.put("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  // db.movies.updateOne({ id: id }, { $set: { rating: 9 } });

  const result = await client
    .db("b40wd")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });

  console.log(result);
  response.send(result);
});

// FIND all movies using filters

app.get("/movies", async function (request, response) {
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  console.log(request.query);
  const movie = await client
    .db("b40wd")
    .collection("movies")
    .find(request.query)
    .toArray();

  response.send(movie);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
