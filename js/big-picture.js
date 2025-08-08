import {renderComments, removeComments} from './render-comments.js';
import {isEscapeKey} from './util.js';

const picturesWrapper = document.querySelector('.pictures');
const bodyElement = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const renderBigPicture = ({url, likes, description, comments}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;

  renderComments(comments);
};

function openBigPicture (photoElement) {
  bigPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  renderBigPicture(photoElement);
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  removeComments();
  document.removeEventListener('keydown', onDocumentKeydown);
}

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

closeBigPictureButton.addEventListener('click', closeBigPicture);

export {setImgClick};
