'use strict';

function checksLengthString (checkString, maxLength) {
  return checkString.length <= maxLength;
}

console.log(checksLengthString('Пропоганда', 15));

function checksPalindromeFirst (checkString) {
  const normalasedCheckString = checkString.replaceAll(' ','').toUpperCase();
  let reverseString = '';
  for (let i = normalasedCheckString.length - 1; i > -1; i--) {
    reverseString += normalasedCheckString[i];
  }
  return reverseString === normalasedCheckString;
}

console.log(checksPalindromeFirst('А роза упала на лапу Азора'));

function checksPalindrome (checkString) {
  const normalasedCheckString = checkString.replaceAll(' ','').toUpperCase();
  const reverseString = normalasedCheckString.split('').reverse().join('');
  return reverseString === normalasedCheckString;
}

console.log(checksPalindrome('А роза упала на лапу Азора'));

function getNumberFromString (checkString) {
  const normalString = checkString.toString();
  let result = '';
  for(let i = 0; i < normalString.length; i++) {
    if (parseInt(normalString[i], 10)) {
      result += normalString[i];
    }
  }
  return result ? result : NaN;
}

console.log(getNumberFromString('524 проблемы и 38 решений'));
