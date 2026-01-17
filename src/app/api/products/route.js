import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createProduct, getAllProducts } from "@/lib/db/products";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, category, image, price, stock, description } = body;

    if (!name || !category) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const res = await createProduct({ name, category, image, price, stock, description });

    return NextResponse.json({ ok: true, id: res.insertedId });
  } catch (err) {
    console.error("/api/products error:", err);
    return NextResponse.json({ message: "Failed to create product" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await getAllProducts();
    const items = (products || []).map((p) => ({ ...p, _id: p._id.toString() }));
    return NextResponse.json({ products: items });
  } catch (err) {
    console.error("/api/products GET error:", err);
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}
