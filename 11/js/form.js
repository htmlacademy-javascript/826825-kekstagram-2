const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagFeld = imgUploadForm.querySelector('.text__hashtags');
const descriptionFeld = imgUploadForm.querySelector('.text__description');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const isHashtagsLengtValid = (value) => value.split(' ').length <= MAX_HASHTAGS_COUNT;

const isHashtagstartsCorrectly = (value) => {
  if (value === '') {
    return true;
  }
  return value.trim().split(' ').every((element) => element.indexOf('#') !== -1);
};

const isHashtaglengthCorrectly = (value) => {
  if (value === '') {
    return true;
  }
  return value.trim().split(' ').every((element) => element.length <= MAX_HASHTAG_LENGTH);
};

const isHashtagValid = (value) => {
  if (value === '') {
    return true;
  }
  return value.trim().split(' ').every((element) => hashtag.test(element));
};

const isSpacesBetweenHashtags = (value) => !value.trim().split(' ').every((element) => element.slice(1).includes('#'));

const isHashtagsRepeats = (value) => value.toLowerCase().trim().split(' ').every((element, i, hashTagsArray) =>
  hashTagsArray.indexOf(element) === i);

pristine.addValidator(
  hashtagFeld,
  isHashtagstartsCorrectly,
  'Хэш-Тег должен начинаться с решетки'
);

pristine.addValidator(
  hashtagFeld,
  isHashtagsRepeats,
  'Хэш-Теги не должны повторяться'
);

pristine.addValidator(
  hashtagFeld,
  isHashtaglengthCorrectly,
  `Хэш-Тег не может содержать больше ${MAX_HASHTAG_LENGTH} символов, включая решётку`
);


pristine.addValidator(
  hashtagFeld,
  isHashtagsLengtValid,
  `Нельзя указывать больше ${MAX_HASHTAGS_COUNT} Хэш-Тегов`
);

pristine.addValidator(
  hashtagFeld,
  isHashtagValid,
  'Хештег может содержать только буквы и цыфры'
);

pristine.addValidator(
  hashtagFeld,
  isSpacesBetweenHashtags,
  'возможно забыт пробел между Хештегами'
);

function validateDescription (value) {
  return value.length <= MAX_DESCRIPTION_LENGTH;
}

pristine.addValidator(
  descriptionFeld,
  validateDescription,
  `длина комментария больше ${MAX_DESCRIPTION_LENGTH} символов`
);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
