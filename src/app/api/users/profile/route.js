import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { updateProfile } from "@/lib/db/users";

export async function PUT(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, photoURL } = await req.json();

  const updatedUser = await updateProfile({
    email: session.user.email,
    name,
    photoURL,
  });

  return NextResponse.json({
    message: "Profile updated successfully",
    user: updatedUser,
  });
}