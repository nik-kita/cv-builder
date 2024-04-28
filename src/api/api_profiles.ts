import type { paths } from '@/api.types';
import { refresh_wrapper } from "./refresh_wrapper";



const origin_api_profiles = async (access_token: string) => {
  const res = await fetch(import.meta.env.VITE_API_URL + "/profiles", {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw res;
  }

  const profiles = await res.json();

  return profiles as paths['/profiles/']['get']['responses']['200']['content']['application/json'];
};

export const api_profiles = refresh_wrapper(origin_api_profiles);
