import connectDB from "./dbConnect.js";

export const DB_NAME = "techgetUltra";

export async function productsCollection() {
  const client = await connectDB();
  const db = client.db(DB_NAME);
  return db.collection("products");
}

export async function createProduct({
  name,
  category,
  image = null,
  price = 0,
  stock = 0,
  description = "",
}) {
  const products = await productsCollection();
  const now = new Date();

  const doc = {
    name,
    category,
    image,
    price: Number(price),
    stock: Number(stock),
    description,
    created_at: now,
    updated_at: now,
  };

  const result = await products.insertOne(doc);
  return result;
}
