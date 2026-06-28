import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { resetTokens, setTokens } from "../store/reducers/authReducer";
import { RootState } from "../store/store";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const getStoredToken = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return (
    localStorage.getItem("access_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    ""
  );
};

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const stateToken = (getState() as RootState).auth.accessToken;
    const token = stateToken || getStoredToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("x-access-token", token);
      headers.set("x-auth-token", token);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const errorData = result.error?.data as any;
  const isTokenExpired =
    result.error?.status === 401 &&
    typeof errorData === "object" &&
    errorData !== null &&
    errorData?.data?.type === "TOKEN_EXPIRED";
  const isNetworkFailure = result.error?.status === "FETCH_ERROR" || result.error?.status === 503;

  if (isNetworkFailure) {
    return result;
  }

  if (isTokenExpired) {
    const authState = (api.getState() as RootState).auth;

    if (!authState.accessToken || !authState.refreshToken) {
      return result; // Nothing to do if we don't have tokens
    }

    const refreshResult = await baseQuery(
      {
        url: "users/refresh-token",
        method: "POST",
        body: { refreshToken: authState.refreshToken },
      },
      api,
      extraOptions
    );

    const refreshData = refreshResult.data as any;
    const data = refreshData?.data as {
      accessToken: string;
      refreshToken: string;
    } | undefined;

    if (data) {
      // Update state with new tokens
      api.dispatch(setTokens(data));

      // Retry original request with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(resetTokens());
    }
  }

  return result;
};
