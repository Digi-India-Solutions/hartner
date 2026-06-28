import ResetPassword from "@/components/ResetPassword";

function Index() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("code");
  const type = params.get("type") as "reset-password" | "invite";

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-navy-50 py-12 px-4">
      <ResetPassword token={token!} type={type!} />
    </div>
  );
}

export default Index;
