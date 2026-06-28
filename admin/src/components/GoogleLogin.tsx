import { toast } from "react-toastify";
// @ts-ignore
import { IResolveParams, LoginSocialGoogle } from "reactjs-social-login";
import { useLoginByGoogleMutation } from "../services/api";

export default function GoogleLogin() {
  const [loginWithGoogle] = useLoginByGoogleMutation();
  const googleClientId = import.meta.env.VITE_GOOGLE_API_KEY;

  const handleGoogleAuth = async (data: IResolveParams) => {
    if (data.data?.access_token) {
      await login(data.data.access_token);
    }
  };

  const login = async (access_token: string) => {
    try {
      await loginWithGoogle({
        access_token,
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
        if (!googleClientId) {
          toast.info("Google Sign In is not configured.");
        }
      }}
      className="w-10 h-10 rounded-full border border-navy-200 hover:border-brand-500 bg-white flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          fill="#EA4335"
        />
      </svg>
    </button>
  );

  if (!googleClientId) {
    return renderButton();
  }

  return (
    <LoginSocialGoogle
      isOnlyGetToken
      redirect_uri={window.location.href}
      client_id={googleClientId}
      scope="profile email"
      onResolve={handleGoogleAuth}
    >
      {renderButton()}
    </LoginSocialGoogle>
  );
}
