import { use_auth } from '@/use_auth';
import { useQuery } from "@tanstack/vue-query";
import { api_profiles } from "./api/api_profiles";

const { is_user } = use_auth();

const profiles = () => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: api_profiles,
    enabled: is_user,
  })
}

export const use_api = () => {
  return {
    profiles() {
      return profiles();
    }
  }
}
