import {isEscapeKey} from './util.js';
import {resetEffects} from './photo-effects.js';
import {resetScaleValue} from './photo-scale.js';

const bodyElement = document.querySelector('body');
const fileUpload = document.querySelector('.img-upload');
const imgUploadOverlay = fileUpload.querySelector('.img-upload__overlay');
const uploadInput = fileUpload.querySelector('.img-upload__input');
const closeBigPictureButton = fileUpload.querySelector('.img-upload__cancel');
const hashtagFeld = imgUploadOverlay.querySelector('.text__hashtags');
const descriptionFeld = imgUploadOverlay.querySelector('.text__description');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagFeld || document.activeElement === descriptionFeld) {
      evt.stopPropagation();
    } else {
      closeUploadForm();
    }
  }
};

const onCloseButtonClick = () => {
  closeUploadForm();
};

function closeUploadForm () {
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  uploadInput.value = '';
  resetScaleValue();
  resetEffects();
  hashtagFeld.value = '';
  descriptionFeld.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
  closeBigPictureButton.removeEventListener('click', onCloseButtonClick);
}

function openUploadForm () {
  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  closeBigPictureButton.addEventListener('click', onCloseButtonClick);
}

uploadInput.addEventListener('change', openUploadForm);

export {closeUploadForm};
