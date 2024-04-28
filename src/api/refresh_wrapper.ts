import { get_access } from "@/stuff/get_access";
import { get_refresh } from "@/stuff/get_refresh";
import { update_tokens } from "@/stuff/update_tokens";
import { api_refresh } from "./api_refresh";

export const refresh_wrapper = <
  T extends (access_token: string, ...args: any[]) => any,
>(
  api_call: T,
) => {
  return async (
    ..._args: Tail<Parameters<T>>
  ): Promise<Awaited<ReturnType<T>>> => {
    const access_token = get_access();

    if (!access_token) {
      throw new Error("No access token found");
    }

    try {
      const res = await api_call(access_token, ..._args);
      return res;
    } catch (err: any) {

      if (err.status && [401, 403].includes(err.status)) {
        const refresh = get_refresh();

        if (!refresh) {
          throw new Error("No refresh token found");
        }

        const res = await api_refresh(refresh);

        update_tokens({
          access_token: res.access_token,
          refresh_token: res.refresh_token,
        });

        return api_call(res.access_token, ..._args);
      } else {
        throw err;
      }
    }
  };
};
