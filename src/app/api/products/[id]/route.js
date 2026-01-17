import { NextResponse } from "next/server";
import { getProductById } from "@/lib/db/products";

export async function GET(req, context) {
  try {
    let params = context?.params;
    if (params && typeof params.then === "function") {
      params = await params;
    }
    const id = params?.id;

    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    product._id = product._id.toString();
    return NextResponse.json({ product });
  } catch (err) {
    console.error("/api/products/[id] GET error:", err);
    return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 });
  }
}
