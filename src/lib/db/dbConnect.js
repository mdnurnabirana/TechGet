import { MongoClient, ServerApiVersion } from "mongodb";
import 'dotenv/config';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let clientPromise;

async function connectDB() {
  if (!clientPromise) {
    clientPromise = client.connect();
    await clientPromise;
    console.log("Connected to MongoDB!");
  }
  return client;
}

export default connectDB;