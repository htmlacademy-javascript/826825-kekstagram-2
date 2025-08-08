import {clearDomElements} from './util.js';

const picturesWrapper = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

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

};

export {renderPhotos};
