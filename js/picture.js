// import {createPhotos} from './data.js';
import {openBigPicture} from './big-picture.js';

const picturesWrapper = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

let userPhotos = [];

const renderPhotos = (serverData) => {

  userPhotos = serverData.slice();
  const userPhotosFragment = document.createDocumentFragment();

  userPhotos.forEach(({id, url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const image = pictureElement.querySelector('.picture__img');

    pictureElement.dataset.id = id;
    image.src = url;
    image.alt = description;
    pictureElement.querySelector('.picture__likes')
      .textContent = likes;
    pictureElement.querySelector('.picture__comments')
      .textContent = comments.length;
    userPhotosFragment.appendChild(pictureElement);
  });

  picturesWrapper.appendChild(userPhotosFragment);
};


picturesWrapper.addEventListener('click', (evt) => {
  const target = evt.target.closest('.picture');
  if (!target) {
    return;
  }
  const photoElement = userPhotos.find((photo) => photo.id === Number(target.dataset.id));
  openBigPicture(photoElement);
});

export {renderPhotos};
