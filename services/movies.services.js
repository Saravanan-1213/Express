import { client } from "../index.js";
import { ObjectId } from "mongodb";

export async function getMoviesById(id) {
  console.log("****", id);
  return await client
    .db("b40wd")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
}
export async function updateMovieById(id, data) {
  return await client
    .db("b40wd")
    .collection("movies")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}
export async function deleteMovieById(id) {
  return await client
    .db("b40wd")
    .collection("movies")
    .deleteOne({ _id: ObjectId(id) });
}
export async function getMovies() {
  return await client.db("b40wd").collection("movies").find({}).toArray();
}
export async function createMovies(data) {
  return await client.db("b40wd").collection("movies").insertMany(data);
}
