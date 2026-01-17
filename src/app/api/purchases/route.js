import { NextResponse } from "next/server";
import { createPurchase } from "@/lib/db/purchases";

export async function POST(req) {
  try {
    const body = await req.json();
    const { productId, price, quantity, user } = body;

    if (!productId) {
      return NextResponse.json({ message: "Missing productId" }, { status: 400 });
    }

    const res = await createPurchase({ productId, price, quantity, user });
    return NextResponse.json({ ok: true, id: res.insertedId });
  } catch (err) {
    console.error("/api/purchases error:", err);
    return NextResponse.json({ message: "Failed to create purchase" }, { status: 500 });
  }
}
