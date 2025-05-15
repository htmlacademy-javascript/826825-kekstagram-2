'use strict';

function checksLengthString (checkString, maxLength) {
  return checkString.length <= maxLength;
}

function checksPalindromeFirst (checkString) {
  const normalasedCheckString = checkString.replaceAll().toUpperCase();
  let reverseString = '';
  for (let i = normalasedCheckString.length - 1; i > -1; i--) {
    reverseString += normalasedCheckString[i];
  }
  return reverseString === normalasedCheckString;
}

function checksPalindrome (checkString) {
  const normalasedCheckString = checkString.replaceAll().toUpperCase();
  const reverseString = normalasedCheckString.split('').reverse().join('');
  return reverseString === normalasedCheckString;
}

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
