// const express = require("express"); // 3rd party package installed
import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import moviesRouter from "./routes/movies.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

console.log(process.env.MONGO_URL);

const app = express(); // called imported package express we will get app

const PORT = process.env.PORT; // Autp assign PORT

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

app.use("/movies", moviesRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export { client };
