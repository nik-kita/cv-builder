const api_url = import.meta.env.VITE_API_URL;

export const api_logout = async (refresh_token: string) => {
  const res = await fetch(api_url + "/auth/logout", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token }),
  });

  if (!res.ok) {
    console.error("Failed to logout on backend!");
  }
};
