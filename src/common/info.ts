declare global {
  type UserInfo = {
    username?: string | null;
  }
}

export const update_info = (data?: UserInfo) => {
  if (!data) {
    localStorage.removeItem('user_info');
  } else {
    localStorage.setItem('user_info', JSON.stringify(data));
  }
};

export const get_info = () => {
  try {
    const data = localStorage.getItem('user_info');
    if (!data) return;

    return JSON.parse(data) as UserInfo;
  } catch (err) {
    console.error(err);
  }
};
