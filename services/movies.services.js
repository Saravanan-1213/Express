import { client } from "../index.js";

export async function getMoviesById(id) {
  return await client.db("b40wd").collection("movies").findOne({ id: id });
}
export async function updateMovieById(id, data) {
  return await client
    .db("b40wd")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
}
export async function deleteMovieById(id) {
  return await client.db("b40wd").collection("movies").deleteOne({ id: id });
}
export async function getMovies() {
  return await client.db("b40wd").collection("movies").find({}).toArray();
}
export async function createMovies(data) {
  return await client.db("b40wd").collection("movies").insertMany(data);
}
