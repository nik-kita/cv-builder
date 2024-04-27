export const update_tokens = (payload?: {
  access_token: string;
  refresh_token: string;
}) => {
  if (payload) {
    localStorage.setItem("access_token", payload.access_token);
    localStorage.setItem("refresh_token", payload.refresh_token);
  } else {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};
