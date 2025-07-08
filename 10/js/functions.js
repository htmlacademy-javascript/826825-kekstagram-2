const msInMin = 60000;
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

const getTimeInMinutes = (time) => (new Date(0, 0, 0, ...time.split(':')) / msInMin);

const isMeetTimeAppropriate = (startWorkingTime, endWorkinTime, startMeetingTime, meetingDuration) => {

  const startWork = getTimeInMinutes(startWorkingTime);
  const endWork = getTimeInMinutes(endWorkinTime);
  const startMeeting = getTimeInMinutes(startMeetingTime);
  if (startMeeting < startWork) {
    return false;
  }
  return (endWork - startMeeting) >= meetingDuration;
};

isMeetTimeAppropriate('8:00', '17:30', '13:00', 1000);
