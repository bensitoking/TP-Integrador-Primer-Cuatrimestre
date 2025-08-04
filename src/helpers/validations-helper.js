export const isEmailValid = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isShortText = (text) => {
  return typeof text !== 'string' || text.trim().length < 3;
};

export const isPositiveNumber = (value) => {
  return typeof value === 'number' && value >= 0;
};
