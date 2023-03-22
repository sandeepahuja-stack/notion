const deepCopy = (obj) => {
  // for future
  // implement recursive iteration for deep copy
  return JSON.parse(JSON.stringify(obj));
};

export default deepCopy;