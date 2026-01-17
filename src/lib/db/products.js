import { ObjectId } from "mongodb";
import connectDB from "./dbConnect.js";

export const DB_NAME = "techgetUltra";

export async function productsCollection() {
  const client = await connectDB();
  const db = client.db(DB_NAME);
  return db.collection("products");
}

export async function getAllProducts() {
  const coll = await productsCollection();
  const docs = await coll.find({}).toArray();
  return docs;
}

export async function getProductById(id) {
  if (!id) return null;
  try {
    const coll = await productsCollection();
    const doc = await coll.findOne({ _id: new ObjectId(id) });
    return doc;
  } catch (err) {
    console.error("getProductById error", err);
    return null;
  }
}

export async function decrementStock(id, qty = 1) {
  try {
    const coll = await productsCollection();
    const q = Math.abs(Number(qty) || 1);
    const res = await coll.updateOne({ _id: new ObjectId(id), stock: { $gte: q } }, { $inc: { stock: -q } });
    if (!res || res.modifiedCount !== 1) return null;
    // fetch updated document
    const doc = await coll.findOne({ _id: new ObjectId(id) });
    return doc || null;
  } catch (err) {
    console.error("decrementStock error", err);
    return null;
  }
}

export async function createProduct({ name, category, image, price = 0, stock = 0, description = "" }) {
  const coll = await productsCollection();
  const now = new Date();
  const doc = { name, category, image, price: Number(price), stock: Number(stock), description, created_at: now };
  const result = await coll.insertOne(doc);
  return result;
}
