import 'dotenv/config';
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
console.log(uri)
const client = new MongoClient(uri, {
  family: 4,
  autoSelectFamily: false,
  serverSelectionTimeoutMS: 30000
});

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully");
    
    const db = client.db("techgetUltra");
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();