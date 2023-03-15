export const isEmpty = (value) => {
  return (typeof value === 'number' && value <= 0) || !value;
};

export const isString = (value) => {
  return typeof value === 'string';
};

export const isNumber = (value) => {
  return typeof value === 'number';
};
