import { get_access_token } from "@/common/tokens";

export const simple_fetch = async <T>(input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw response;
  }

  return response.json() as Promise<T>;
};

export const app_fetch = async <T>(input: RequestInfo, init?: RequestInit) => {
  const access_token = get_access_token();

  return simple_fetch<T>(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(access_token && { 'Authorization': `Bearer ${get_access_token()}` }),
      ...init?.headers,
    },
    body: init?.body && JSON.stringify(init.body),
  });
};
