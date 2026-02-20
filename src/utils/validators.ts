export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validateUsername = (username: string): boolean => {
  return username.length >= 3 && username.length <= 30;
};

export const validateCollectionName = (name: string): boolean => {
  return name.trim().length >= 1 && name.length <= 50;
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const sanitizeString = (str: string): string => {
  return str
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, 1000);
};

export const isNetworkError = (error: any): boolean => {
  return (
    error?.message?.includes('Network') ||
    error?.message?.includes('timeout') ||
    error?.code === 'NETWORK_ERROR'
  );
};

export const getErrorMessage = (error: any): string => {
  if (error?.message) return error.message;
  if (error?.data?.message) return error.data.message;
  return 'An unexpected error occurred';
};
