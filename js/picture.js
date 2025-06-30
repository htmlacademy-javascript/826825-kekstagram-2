import {createPhotos} from './data.js';

const picturesWrapper = document.querySelector('.pictures');
const picturTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const userPhotos = createPhotos();

const userPhotosFragment = document.createDocumentFragment();

userPhotos.forEach(({url, description, likes, comments}) => {
  const pictureElement = picturTemplate.cloneNode(true);
  const image = pictureElement.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  pictureElement.querySelector('.picture__likes')
    .textContent = likes;
  pictureElement.querySelector('.picture__comments')
    .textContent = comments.length;
  userPhotosFragment.appendChild(pictureElement);
});

picturesWrapper.appendChild(userPhotosFragment);
