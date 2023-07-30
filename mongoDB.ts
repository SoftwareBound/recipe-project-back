import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/Recipes");

export async function insertOne(dataToInsert: Object) {
  let data = await dbConnect();
  data.insertOne(dataToInsert);
}

export async function findOne(dataToFind: Object) {
  try {
    let data = await dbConnect();
    const result = await data.findOne(dataToFind);
    const JSONResult = JSON.parse(JSON.stringify(result));
    return JSONResult;
  } catch {
    throw Error("couldnt perform findOne action");
  }
}

async function dbConnect() {
  try {
    const connection = await client.connect();
    console.log("connected to db successful");
    const db = connection.db("Recipes");
    return db.collection("recipes");
  } catch {
    throw Error("connection to db failed");
  }
}
