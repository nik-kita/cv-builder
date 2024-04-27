const api_url = import.meta.env.VITE_API_URL;

export const api_refresh = async (refresh_token: string) => {
  const res = await fetch(api_url + "/auth/refresh", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to refresh");
  }

  const tokens = await res.json() as {
    access_token: string;
    refresh_token: string;
    type: string;
  };

  return tokens;
};
