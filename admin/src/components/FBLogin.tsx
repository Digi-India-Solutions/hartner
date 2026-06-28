import { toast } from "react-toastify";
// @ts-ignore
import { IResolveParams, LoginSocialFacebook } from "reactjs-social-login";
import { useLoginByFacebookMutation } from "../services/api";

export default function FBLogin() {
  const [fbLogin] = useLoginByFacebookMutation();
  const fbAppId = import.meta.env.VITE_FB_APP_ID;

  const handleOnResolve = async (data: IResolveParams) => {
    try {
      await fbLogin({
        access_token: data.data.accessToken || "",
      }).unwrap();
    } catch (error: any) {
      toast.error(
        error?.message || error?.data?.message || "Something went wrong!"
      );
    }
  };

  const renderButton = () => (
    <button
      type="button"
      onClick={() => {
        if (!fbAppId) {
          toast.info("Facebook Sign In is not configured.");
        }
      }}
      className="w-10 h-10 rounded-full border border-navy-200 hover:border-brand-500 bg-white flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
    >
      <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    </button>
  );

  if (!fbAppId) {
    return renderButton();
  }

  return (
    <LoginSocialFacebook
      appId={fbAppId}
      redirect_uri={window.location.href}
      onResolve={handleOnResolve}
      onReject={(e: any) => console.log(e, "onReject")}
    >
      {renderButton()}
    </LoginSocialFacebook>
  );
}
