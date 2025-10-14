export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isStrongPassword = (password: string): boolean => {
  return password.length >= 8;
};

export const isPasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

