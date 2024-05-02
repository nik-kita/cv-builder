import { app_fetch } from "./fetch";

export const api_logout = async (
  // TODO payload: ApiRes<'post', '/auth/sign-in'>,
  payload: {
    refresh_token: string;
  }) => {
  return app_fetch<ApiRes<'post', '/auth/logout'>>('/auth/logout', payload, { method: 'post' });
};
