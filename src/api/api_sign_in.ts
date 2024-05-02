import { app_fetch } from "./fetch";

export const api_sing_in = async (payload: ApiReq<'post', '/auth/sign-in'>) => {
  return app_fetch<ApiRes<'post', '/auth/sign-in'>>('/auth/sign-in', payload, { method: 'post' });
};
