import {openBigPicture} from './big-picture.js';
import {clearDomElements} from './util.js';

const picturesWrapper = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const setImgClick = (userPhotos) => {
  picturesWrapper.addEventListener('click', (evt) => {
    const target = evt.target.closest('.picture');
    if (!target) {
      return;
    }
    const photoElement = userPhotos.find((photo) => photo.id === Number(target.dataset.id));
    openBigPicture(photoElement);
  });
};

const renderPhotos = (photos) => {

  const userPhotosFragment = document.createDocumentFragment();

  clearDomElements(picturesWrapper, 'a');

  photos.forEach(({id, url, description, likes, comments}) => {
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

  setImgClick(photos);
};

export {renderPhotos};
