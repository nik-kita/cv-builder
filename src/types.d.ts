import type { paths } from "./api/openapi";

declare global {
  type Tail<T extends any[]> = T extends [infer _first, ...infer Rest] ? Rest : never;
  type OmitStrict<
    T extends Record<string, any>,
    K extends keyof T,
  > = Omit<T, K> & Partial<Record<K, never>>
  type OmitReplace<
    T extends Record<string, any>,
    U extends Partial<Record<keyof T, any>>,
  > = Omit<T, keyof U> & U;

  type AddOrReplace<
    T extends Record<string, any>,
    U extends Record<string, any>
  > = Omit<T, keyof U> & U;

  type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

  type ApiReq<M extends Method, T extends keyof paths> = paths[T][M]['requestBody']['content']['application/json'];
  type ApiRes<M extends Method, T extends keyof paths> = paths[T][M]['responses']['200']['content']['application/json'];
}

export { };
