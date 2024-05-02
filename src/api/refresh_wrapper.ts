import { get_refresh_token, update_tokens } from "@/common/tokens";
import { api_refresh } from "./api_refresh";

export const refresh_wrapper = <T extends (...args: any[]) => any>(fn: T) => {
  return async (..._args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      const res = await fn(..._args);

      return res;
    } catch (err: any) {
      if ([401, 403].includes(err.status)) {
        const prev_refresh_token = get_refresh_token();

        if (!prev_refresh_token) {
          throw new Error('No refresh token found');
        }

        const { refresh_token, access_token } = await api_refresh(prev_refresh_token);

        update_tokens({ access_token, refresh_token });

        return fn(..._args);
      }

      throw err;
    }
  };
};
