import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { IProperty, User, ApiResponse, IPropertyImage, IPage } from "../types";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["ME", "PROPERTY", "PROPERTY_LIST", "PAGE"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    me: builder.query<ApiResponse<User>, void>({
      query: () => "users/me",
      providesTags: ["ME"],
    }),
    login: builder.mutation<
      ApiResponse<{ accessToken: string; refreshToken: string; user?: User }>,
      { email: string; password: string }
    >({
      query: (body) => {
        return { url: "auth/login", method: "POST", body };
      },
      // Transform PDF token response to Redux auth format
      transformResponse: (response: any) => {
        const token = response?.token || response?.accessToken || response?.data?.token || response?.data?.accessToken || "";
        const refreshToken = response?.refreshToken || response?.data?.refreshToken || token;
        const user = response?.user || response?.data?.user;

        return {
          success: response?.success ?? true,
          message: response?.message || "",
          data: {
            accessToken: token,
            refreshToken,
            user,
          },
        };
      },
    }),
    register: builder.mutation<
      ApiResponse<User>,
      Omit<User, "_id" | "active" | "role" | "provider"> & {
        confirmPassword: string;
      }
    >({
      query: (body) => {
        return { url: "users/register", method: "POST", body };
      },
    }),
    updateUser: builder.mutation<ApiResponse<User>, User>({
      query: (body) => {
        return { url: `users/${body._id}`, method: "PUT", body };
      },
    }),
    logout: builder.mutation<ApiResponse<{ message: string }>, void>({
      query: () => {
        return { url: "auth/logout", method: "POST" };
      },
    }),
    loginByApple: builder.mutation<
      ApiResponse<{ accessToken: string; refreshToken: string }>,
      { id_token: string }
    >({
      query: (body) => {
        return { url: "users/social/apple", method: "POST", body };
      },
    }),
    loginByGoogle: builder.mutation<
      ApiResponse<{ accessToken: string; refreshToken: string }>,
      { access_token: string }
    >({
      query: (body) => {
        return { url: "users/social/google", method: "POST", body };
      },
    }),
    loginByLinkedIn: builder.mutation<
      ApiResponse<{ accessToken: string; refreshToken: string }>,
      { access_token: string }
    >({
      query: (body) => {
        return { url: "users/social/linkedin", method: "POST", body };
      },
    }),
    loginByFacebook: builder.mutation<
      ApiResponse<{ accessToken: string; refreshToken: string }>,
      { access_token: string }
    >({
      query: (body) => {
        return { url: "users/social/facebook", method: "POST", body };
      },
    }),
    changePassword: builder.mutation<
      ApiResponse<{}>,
      {
        confirmPassword: string;
        password: string;
        currentPassword?: string | null;
      }
    >({
      query: (body) => {
        return { url: "users/change-password", method: "POST", body };
      },
    }),
    resetPassword: builder.mutation<
      ApiResponse<{}>,
      {
        confirmPassword: string;
        password: string;
        token: string;
      }
    >({
      query: (body) => {
        return { url: "users/reset-password", method: "POST", body };
      },
    }),
    verfiyInvitation: builder.mutation<
      ApiResponse<{}>,
      {
        confirmPassword: string;
        password: string;
        token: string;
      }
    >({
      query: (body) => {
        return { url: "users/verify-invitation", method: "POST", body };
      },
    }),
    forgotPassword: builder.mutation<
      ApiResponse<{}>,
      {
        email: string;
      }
    >({
      query: (body) => {
        return { url: "users/forgot-password", method: "POST", body };
      },
    }),

    // Properties Endpoints
    getProperties: builder.query<
      ApiResponse<IProperty[]>,
      { status?: string; search?: string; category?: string } | void
    >({
      query: (params) => ({
        url: "properties",
        params: params || {},
      }),
      providesTags: ["PROPERTY_LIST"],
    }),
    getProperty: builder.query<ApiResponse<IProperty>, string>({
      query: (id) => `properties/${id}`,
      providesTags: (_result, _error, id) => [{ type: "PROPERTY", id }],
    }),
    createProperty: builder.mutation<ApiResponse<IProperty>, Partial<IProperty>>({
      query: (body) => ({
        url: "properties",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PROPERTY_LIST"],
    }),
    updateProperty: builder.mutation<ApiResponse<IProperty>, { id: string; body: Partial<IProperty> }>({
      query: ({ id, body }) => ({
        url: `properties/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => ["PROPERTY_LIST", { type: "PROPERTY", id }],
    }),
    deleteProperty: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `properties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PROPERTY_LIST"],
    }),
    updatePropertyStatus: builder.mutation<ApiResponse<IProperty>, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `properties/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => ["PROPERTY_LIST", { type: "PROPERTY", id }],
    }),
    updatePropertiesOrder: builder.mutation<ApiResponse<null>, { order: string[] }>({
      query: (body) => ({
        url: "properties/reorder",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["PROPERTY_LIST"],
    }),

    // Property Images Endpoints (Multipart & Disk management)
    uploadPropertyImages: builder.mutation<ApiResponse<IPropertyImage[]>, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `properties/${id}/images`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (_result, _error, { id }) => ["PROPERTY_LIST", { type: "PROPERTY", id }],
    }),
    deletePropertyImage: builder.mutation<ApiResponse<null>, { id: string; imageId: string }>({
      query: ({ id, imageId }) => ({
        url: `properties/${id}/images/${imageId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { id }) => ["PROPERTY_LIST", { type: "PROPERTY", id }],
    }),
    deletePropertyImagesBulk: builder.mutation<ApiResponse<{ message: string }>, { id: string; imageIds: string[] }>({
      query: ({ id, imageIds }) => ({
        url: `properties/${id}/images/delete-bulk`,
        method: "POST",
        body: { image_ids: imageIds },
      }),
      invalidatesTags: (_result, _error, { id }) => ["PROPERTY_LIST", { type: "PROPERTY", id }],
    }),
    updatePropertyImagesOrder: builder.mutation<ApiResponse<null>, { id: string; order: string[] }>({
      query: ({ id, order }) => ({
        url: `properties/${id}/images/reorder`,
        method: "PATCH",
        body: { order },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "PROPERTY", id }],
    }),

    // Legal Pages Endpoints
    getPage: builder.query<ApiResponse<IPage>, string>({
      query: (slug) => `pages/${slug}`,
      providesTags: (_result, _error, slug) => [{ type: "PAGE", id: slug }],
    }),
    updatePage: builder.mutation<ApiResponse<IPage>, { slug: string; content: string }>({
      query: ({ slug, content }) => ({
        url: `pages/${slug}`,
        method: "PUT",
        body: { content },
      }),
      invalidatesTags: (_result, _error, { slug }) => [{ type: "PAGE", id: slug }],
    }),
  }),
});

export const {
  useMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useLoginByAppleMutation,
  useLoginByFacebookMutation,
  useLoginByGoogleMutation,
  useLoginByLinkedInMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerfiyInvitationMutation,
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
  useUpdatePropertyStatusMutation,
  useUpdatePropertiesOrderMutation,
  useUploadPropertyImagesMutation,
  useDeletePropertyImageMutation,
  useDeletePropertyImagesBulkMutation,
  useUpdatePropertyImagesOrderMutation,
  useGetPageQuery,
  useUpdatePageMutation,
} = api;
