
const checksLengthString = (checkString, maxLength) => checkString.length <= maxLength;

checksLengthString('Пропоганда', 15);

const isStringPalindrome = (checkString) => {

  const normalasedCheckString = checkString.replaceAll(' ','').toUpperCase();
  const reverseString = normalasedCheckString.split('').reverse().join('');
  return reverseString === normalasedCheckString;
};

isStringPalindrome('А роза упала на лапу Азора');

const getNumberFromString = (checkString) => {
  const normalString = checkString.toString();
  let result = '';
  for(let i = 0; i < normalString.length; i++) {
    if (parseInt(normalString[i], 10)) {
      result += normalString[i];
    }
  }
  return result ? result : NaN;
};

getNumberFromString('524 проблемы и 38 решений');
