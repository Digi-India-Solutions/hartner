import { toast } from "react-toastify";
// @ts-ignore
import { IResolveParams, LoginSocialApple } from "reactjs-social-login";
import { useLoginByAppleMutation } from "../services/api";

export default function AppleLogin() {
  const [loginByApple] = useLoginByAppleMutation();
  const appleClientId = import.meta.env.VITE_APPLE_BUNDLE_ID;

  const handleAppleLogin = async (params: IResolveParams) => {
    try {
      const id_token = params.data?.authorization?.id_token || "";
      if (!id_token) {
        throw new Error("Id token not found.");
      }
      await loginByApple({
        id_token,
      }).unwrap();
    } catch (error: any) {
      toast.error(
        error?.message || error?.data?.message || "Something went wrong"
      );
    }
  };

  const handleAppleLoginError = async (
    params: { [key: string]: any } | string
  ) => {
    if (typeof params !== "string" && params.err && params.err.error) {
      if (
        !["popup_closed_by_user", "user_trigger_new_signin_flow"].includes(
          params.err.error
        )
      ) {
        toast.error(params.err.error);
      }
    }
  };

  const renderButton = () => (
    <button
      type="button"
      onClick={() => {
        if (!appleClientId) {
          toast.info("Apple Sign In is not configured.");
        }
      }}
      className="w-10 h-10 rounded-full border border-navy-200 hover:border-brand-500 bg-white flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
    >
      <svg className="w-5 h-5 text-navy-900" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.63.73-1.18 1.87-1.03 2.97 1.12.09 2.27-.58 2.98-1.41z" />
      </svg>
    </button>
  );

  if (!appleClientId) {
    return renderButton();
  }

  return (
    <LoginSocialApple
      client_id={appleClientId}
      redirect_uri={window.location.href}
      onResolve={handleAppleLogin}
      onReject={handleAppleLoginError}
    >
      {renderButton()}
    </LoginSocialApple>
  );
}
