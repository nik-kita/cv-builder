const api_url = import.meta.env.VITE_API_URL;

export const api_sign_in = async (
  payload: {
    credential: string;
    auth_provider: string;
  },
) => {
  const res = await fetch(api_url + "/auth/sign-in", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to sign in");
  }

  const tokens = await res.json() as {
    access_token: string;
    refresh_token: string;
    type: string;
  };

  return tokens;
};
