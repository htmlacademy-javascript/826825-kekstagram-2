const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomUniqueInteger = (maxNumber) => {
  const numbers = [];
  const getUniqueNumber = () => {
    const uniqueNumber = getRandomInteger(1, maxNumber);
    if (numbers.includes(uniqueNumber)) {
      return getUniqueNumber();
    }
    numbers.push(uniqueNumber);
    return uniqueNumber;
  };
  return getUniqueNumber;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const clearDomElements = (parentElement, tagElement) => {
  const domElement = parentElement.querySelectorAll(tagElement);
  domElement.forEach((node) => {
    node.parentNode.removeChild(node);
  });
};

export {
  getRandomUniqueInteger,
  getRandomArrayElement,
  getRandomInteger,
  isEscapeKey,
  clearDomElements,
  debounce
};
