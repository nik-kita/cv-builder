import { simple_fetch } from "./fetch";

export const api_refresh = async (refresh_token: string) => {
  const res = await simple_fetch<ApiRes<'post', '/auth/refresh'>>(`/api/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token } satisfies ApiReq<'post', '/auth/refresh'>),
  });

  return res;
};
