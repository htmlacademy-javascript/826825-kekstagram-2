import {getRandomInteger, getRandomArrayElement, getRandomUniqueInteger} from './until.js';

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const PHOTO_DESCRIPTION = [
  'Пляж',
  'Указатель к пляжу',
  'Вода на камнях',
  'Девушка с фотоаппаратом',
  'Обед рис с мясом',
  'Черный спорт кар',
  'Земляника в тарелке',
  'морс',
  'самолет над пляжем',
  'обувь',
  'забор на пляже',
  'белая Ауди',
  'овощьной салат',
  'кот суши',
  'в ватниках на диване',
  'шлейф самолота',
  'хор',
  'классическое авто',
  'тапочки с подсветкой',
  'пальмы при отеле',
  'ужин',
  'море на закате',
  'краб',
  'концерт',
  'сафари с бигимотами',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const PHOTO_COUNT = 25;
const MIN_NUMBER = 1;
const MAX_COMMENTS = 30;
const MAX_COMMENTS_ID = 135;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_AVATARS = 6;

const getPhotoId = getRandomUniqueInteger(PHOTO_COUNT);

const createPhoto = () => {
  const photoId = getPhotoId();

  const getCommentID = getRandomUniqueInteger(MAX_COMMENTS_ID);
  const createComments = () => ({
    id: getCommentID(),
    avatar: `img/avatar-${ getRandomInteger(MIN_NUMBER, MAX_AVATARS) }.svg`,
    name: getRandomArrayElement(NAMES),
    message: getRandomArrayElement(COMMENT_MESSAGES),
  });

  return {
    id: photoId,
    url: `photos/${ photoId }.jpg`,
    description: PHOTO_DESCRIPTION[photoId - 1],
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length: getRandomInteger(MIN_NUMBER, MAX_COMMENTS)}, createComments),
  };
};

const createPhotos = () => Array.from({length: PHOTO_COUNT}, createPhoto);

export {createPhotos};
