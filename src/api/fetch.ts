import { get_access_token } from "@/common/tokens";

export const simple_fetch = async <T>(input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw response;
  }

  return response.json() as Promise<T>;
};

const api_url = import.meta.env.VITE_API_URL;

export const app_fetch = async <T>(endpoint: string, body?: object, init?: OmitStrict<RequestInit, 'body'>) => {
  const access_token = get_access_token();

  return simple_fetch<T>(api_url + endpoint, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
      ...(access_token && { 'Authorization': `Bearer ${access_token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });
};
