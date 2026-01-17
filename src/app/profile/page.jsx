import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/lib/db/users";
import ProfileForm from "@/components/Forms/ProfileForm";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = await getUserByEmail(session.user.email);

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <ProfileForm user={JSON.parse(JSON.stringify(user))} />
    </div>
  );
};

export default ProfilePage;