import express from "express";

import {
  getMoviesById,
  createMovies,
  getMovies,
  deleteMovieById,
  updateMovieById,
} from "../services/movies.services.js";
const router = express.Router();

// task-2 http://localhost:4000/movies/99

// GET movies using POSTMAN & FindOne
router.get("/:id", async function (request, response) {
  const { id } = request.params;
  // db.movies.findOne({ id: 99 });
  // const movie = movies.find((mv) => mv.id == id);
  const movie = await getMoviesById(id);
  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ Message: "Moive Not found" });
});

// POST(create) movies using POSTMAN // post => request

router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data);
  //db.movies.insertMany(data);
  const result = await createMovies(data);

  // movie
  //   ? response.send(movies)
  //   : response.status(404).send({ Message: "Movie not found" });
  response.send(result);
});

// FIND ALL movies form DB

router.get("/", async function (request, response) {
  //db.movies.find({})

  // cursor = > Pagination | cursor => Array => toArray
  const movies = await getMovies();
  console.log(movies);

  response.send(movies);
});

// DELETE moives

router.delete("/:id", async function (request, response) {
  const { id } = request.params;

  //db.movies.deleteOne({id:id})
  const result = await deleteMovieById(id);
  console.log(result);
  result.deletedCount > 0
    ? response.send({ Message: "Movie Deleted Successfuly" })
    : response.status(404).send({ Message: "Movie not Found" });
});

// PUT Method (movies) UPDATE

router.put("/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  // db.movies.updateOne({ id: id }, { $set: { rating: 9 } });

  const result = await updateMovieById(id, data);

  console.log(result);
  response.send(result);
});

// FIND all movies using filters

// router.get("/", async function (request, response) {
//   if (request.query.rating) {
//     request.query.rating = +request.query.rating;
//   }
//   console.log(request.query);
//   const movie = await client
//     .db("b40wd")
//     .collection("movies")
//     .find(request.query)
//     .toArray();

//   response.send(movie);
// });

export default router;
