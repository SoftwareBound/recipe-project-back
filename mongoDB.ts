import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/Recipes");
let dbConnection: MongoClient;

export async function insertOne(dataToInsert: Object) {
  try {
    let data = await dbConnect();
    await data.insertOne(dataToInsert);
  } catch {
    throw Error("couldnt perform insertOne action ");
  } finally {
    dbConnection.close();
  }
}

export async function findOne(dataToFind: Object) {
  try {
    let data = await dbConnect();
    const result = await data.findOne(dataToFind);
    return JSON.parse(JSON.stringify(result));
  } catch {
    throw Error("couldnt perform findOne action");
  } finally {
    dbConnection.close();
  }
}

export async function find() {
  try {
    let data = await dbConnect();
    const result = await data.find().toArray();
    return JSON.parse(JSON.stringify(result));
  } catch {
    throw Error("couldnt perform find action");
  } finally {
    dbConnection.close();
  }
}

async function dbConnect() {
  try {
    dbConnection = await client.connect();
    console.log("connected to db successful");
    const db = dbConnection.db("Recipes");
    return db.collection("recipes");
  } catch {
    throw Error("connection to db failed");
  }
}
