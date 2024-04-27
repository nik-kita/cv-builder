declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type Tail<T extends any[]> = T extends [infer _First, ...infer Rest] ? Rest
    : never;
}

export {};
