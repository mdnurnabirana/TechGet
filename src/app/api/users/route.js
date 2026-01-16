import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getUserRole } from "@/lib/db/users";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ role: null }, { status: 401 });
    }

    const role = await getUserRole(session.user.email);

    return NextResponse.json({ role });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to get role" },
      { status: 500 }
    );
  }
}