import { NextResponse } from "next/server";
import { createPurchase, purchasesCollection } from "@/lib/db/purchases";
import { getProductById, decrementStock } from "@/lib/db/products";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { productId, price = 0, quantity = 1 } = body;

    if (!productId) {
      return NextResponse.json({ message: "Missing productId" }, { status: 400 });
    }

    const qty = Number(quantity) || 1;

    // atomically decrement stock if available
    const updatedProduct = await decrementStock(productId, qty);
    if (!updatedProduct) {
      return NextResponse.json({ message: "Out of stock or not enough quantity" }, { status: 400 });
    }

    const userInfo = { email: session.user.email, name: session.user.name };
    const res = await createPurchase({ productId, price, quantity: qty, user: userInfo });
    return NextResponse.json({ ok: true, id: res.insertedId });
  } catch (err) {
    console.error("/api/purchases error:", err);
    return NextResponse.json({ message: "Failed to create purchase" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const coll = await purchasesCollection();
    const filter = { $or: [{ 'user.email': session.user.email }, { user: session.user.email }] };
    const purchases = await coll.find(filter).sort({ created_at: -1 }).toArray();

    // attach product details
    const results = [];
    for (const p of purchases) {
      const prod = await getProductById(p.productId).catch(() => null);
      results.push({
        ...p,
        _id: p._id.toString(),
        product: prod ? { ...prod, _id: prod._id.toString() } : null,
      });
    }

    return NextResponse.json({ purchases: results });
  } catch (err) {
    console.error("/api/purchases GET error:", err);
    return NextResponse.json({ message: "Failed to fetch purchases" }, { status: 500 });
  }
}
