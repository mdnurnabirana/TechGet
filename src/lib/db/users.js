import connectDB from "./dbConnect.js";

export const DB_NAME = "techgetUltra";

export async function usersCollection() {
  const client = await connectDB();
  const db = client.db(DB_NAME);
  return db.collection("users");
}

export async function createUser({ name, email, password, photoURL = null, provider = "email" }) {
  const users = await usersCollection();
  const now = new Date();

  const result = await users.insertOne({
    name,
    email,
    password,
    photoURL,
    provider,
    role: "user",
    created_at: now,
    updated_at: now,
  });

  return result;
}

export async function getUserByEmail(email) {
  const users = await usersCollection();
  return users.findOne({ email });
}