import connectDB from "./dbConnect.js";

export const DB_NAME = "techgetUltra";

export async function usersCollection() {
  const client = await connectDB();
  const db = client.db(DB_NAME);
  return db.collection("users");
}

export async function createUser({
  name,
  email,
  password = null,
  photoURL = null,
  provider = "email",
}) {
  const users = await usersCollection();
  const now = new Date();

  await users.updateOne(
    { email },
    {
      $setOnInsert: {
        name,
        email,
        password,
        photoURL,
        provider,
        role: "user",
        created_at: now,
      },
      $set: { updated_at: now },
    },
    { upsert: true }
  );

  return users.findOne({ email });
}

export async function getUserByEmail(email) {
  const users = await usersCollection();
  return users.findOne({ email });
}

export async function getUserRole(email) {
  if (!email) return null;

  const users = await usersCollection();
  const user = await users.findOne(
    { email },
    { projection: { role: 1 } }
  );

  return user?.role || "user";
}