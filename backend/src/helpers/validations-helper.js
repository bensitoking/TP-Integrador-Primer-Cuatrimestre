export const isEmailValid = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isShortText = (text) => {
  if (text === undefined || text === null) return true;
  if (typeof text !== 'string') return true;
  return text.trim().length < 3;
};

export const isUsernameValid = (username) => {
  if (username === undefined || username === null) return false;
  if (typeof username !== 'string') return false;
  return username.trim().length >= 3;
};

export const isPositiveNumber = (value) => {
  return typeof value === 'number' && value >= 0;
};
