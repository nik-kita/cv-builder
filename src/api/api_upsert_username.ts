import { app_fetch } from './fetch';
import { refresh_wrapper } from './refresh_wrapper';

type Res = ApiRes<'put', '/user/nik/{nik}'>;

const api_upsert_username_origin = async (username: string) => {
  return app_fetch<Res>(`/user/nik/${username}`, undefined, { method: 'put' });
};

export const api_upsert_username = refresh_wrapper(api_upsert_username_origin);
