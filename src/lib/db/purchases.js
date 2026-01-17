import connectDB from "./dbConnect.js";

export const DB_NAME = "techgetUltra";

export async function purchasesCollection() {
  const client = await connectDB();
  const db = client.db(DB_NAME);
  return db.collection("purchases");
}

export async function createPurchase({ productId, price = 0, quantity = 1, user = null }) {
  const purchases = await purchasesCollection();
  const now = new Date();

  const doc = {
    productId,
    price: Number(price),
    quantity: Number(quantity),
    user,
    created_at: now,
  };

  const result = await purchases.insertOne(doc);
  return result;
}
