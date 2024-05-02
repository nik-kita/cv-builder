export const replace_position_with = (path: string, position: number, replacement?: string | null) => {
  const path_splitted = path.split('/');

  path_splitted.splice(position + 1, 1, ...(replacement ? [replacement] : []));

  return path_splitted.join('/');
};
