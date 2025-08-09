import {showPostError, showPostSuccess} from './upload-message.js';
import {sendData} from './api.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

let pristine = '';

const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagFeld = imgUploadForm.querySelector('.text__hashtags');
const descriptionFeld = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

const getArrayFromValue = (value) => value.toLowerCase().trim().split(' ').filter((element) => element !== '');

const isHashtagsLengthValid = (value) => getArrayFromValue(value).length <= MAX_HASHTAGS_COUNT;

const isHashtagValid = (value) => {
  if (value === '') {
    return true;
  }
  return getArrayFromValue(value).every((element) => HASHTAG.test(element));
};

const isHashtagsRepeats = (value) => {
  const hashTags = getArrayFromValue(value);
  return !(new Set(hashTags).size !== hashTags.length);
};

const validateDescription = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

const setPristine = () => {
  pristine = new Pristine(imgUploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error'
  });

  pristine.addValidator(
    descriptionFeld,
    validateDescription,
    `Длина комментария больше ${MAX_DESCRIPTION_LENGTH} символов`
  );

  pristine.addValidator(
    hashtagFeld,
    isHashtagsRepeats,
    'Хэш-Теги не должны повторяться'
  );

  pristine.addValidator(
    hashtagFeld,
    isHashtagsLengthValid,
    `Нельзя указывать больше ${MAX_HASHTAGS_COUNT} Хэш-Тегов`
  );

  pristine.addValidator(
    hashtagFeld,
    isHashtagValid,
    'Не правильный Хэш -Тег, Хэш -тег должен начинаться с решетки, иметь от 2 до 20 символов и содержать только буквы и цыфры'
  );
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const destroyPrestine = () => {
  pristine.destroy();
};

const setFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          showPostSuccess();
          destroyPrestine();
        })
        .catch(
          () => {
            showPostError();
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

export {setFormSubmit, setPristine, destroyPrestine};
