import { usersCollection } from "./users";

// Create a new user
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

// Find a user by email
export async function getUserByEmail(email) {
  const users = await usersCollection();
  return users.findOne({ email });
}