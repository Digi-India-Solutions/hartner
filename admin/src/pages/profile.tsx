import ChangePassword from "@/components/ChangePassword";
import UserProfile from "@/components/UserProfile";
import { useLoaderData } from "react-router-dom";
import { User } from "@/types";

import { api } from "@/services/api";
import { store } from "@/store/store";

export const profileLoader = async () => {
  const result = await store.dispatch(api.endpoints.me.initiate());

  if ("error" in result) {
    throw new Response("Profile not found", { status: 404 });
  }

  return result.data;
};

const Profile = () => {
  const { data } = useLoaderData<{ data: User }>();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <UserProfile data={data} />
      <ChangePassword user={data} />
    </div>
  );
};

export default Profile;
