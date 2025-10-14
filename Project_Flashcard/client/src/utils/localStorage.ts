import type { UserInfo } from "../types/authTypes";

const USER_KEY = "currentUser";

export const saveUserToLocalStorage = (user: UserInfo) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserFromLocalStorage = (): UserInfo | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) as UserInfo : null;
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem(USER_KEY);
};
