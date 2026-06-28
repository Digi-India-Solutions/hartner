import { toast } from "react-toastify";
// @ts-ignore
import { IResolveParams, LoginSocialLinkedin } from "reactjs-social-login";
import { useLoginByLinkedInMutation } from "../services/api";

function LinkedInLogin() {
  const [linkedinLogin] = useLoginByLinkedInMutation();
  const linkedinClientId = import.meta.env.VITE_APP_LINKEDIN_APP_ID;
  const linkedinClientSecret = import.meta.env.VITE_APP_LINKEDIN_APP_SECRET;

  const handleLinkedinAuth = async (data: IResolveParams) => {
    try {
      await linkedinLogin({ access_token: data.data.access_token }).unwrap();
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
        if (!linkedinClientId || !linkedinClientSecret) {
          toast.info("LinkedIn Sign In is not configured.");
        }
      }}
      className="w-10 h-10 rounded-full border border-navy-200 hover:border-brand-500 bg-white flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
    >
      <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    </button>
  );

  if (!linkedinClientId || !linkedinClientSecret) {
    return renderButton();
  }

  return (
    <LoginSocialLinkedin
      isOnlyGetToken
      client_id={linkedinClientId}
      client_secret={linkedinClientSecret}
      redirect_uri={window.location.href}
      scope="openid email profile"
      onResolve={handleLinkedinAuth}
    >
      {renderButton()}
    </LoginSocialLinkedin>
  );
}

export default LinkedInLogin;
