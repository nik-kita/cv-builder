import { simple_fetch } from "./fetch";

const api_url = import.meta.env.VITE_API_URL;

export const api_refresh = async (refresh_token: string) => {
  const res = await simple_fetch<ApiRes<'post', '/auth/refresh'>>(api_url + `/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token } satisfies ApiReq<'post', '/auth/refresh'>),
  });

  return res;
};
