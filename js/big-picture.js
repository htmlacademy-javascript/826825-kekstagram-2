import {picturesWrapper, userPhotos} from './picture.js';
import {isEscapeKey} from './until.js';

const bodyElement = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const commentsWrapper = bigPicture.querySelector('.social__comments');
const closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const photos = userPhotos.slice();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const getComments = (comments) => {
  const commentsArray = comments.slice();
  const userCommentFragment = document.createDocumentFragment();
  const commentTemplate = bigPicture.querySelector('.social__comment');

  commentsArray.forEach(({avatar, message, name}) => {
    const userComment = commentTemplate.cloneNode(true);
    userComment.querySelector('.social__text').textContent = message;
    userComment.querySelector('img').src = avatar;
    userComment.querySelector('img').alt = name;

    userCommentFragment.appendChild(userComment);
  });

  commentsWrapper.innerHTML = '';
  commentsWrapper.appendChild(userCommentFragment);
};

const getBigPicture = ({url, likes, description, comments}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.social__comment-shown-count').textContent = comments.length;
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;

  getComments(comments);
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  //временно по заданию
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

closeBigPictureButton.addEventListener('click', () => {
  closeBigPicture();
});

picturesWrapper.addEventListener('click', (evt) => {
  const target = evt.target.closest('.picture');
  if (!target) {
    return;
  }
  openBigPicture();

  const photoElement = photos.find((photo) => photo.id === Number(target.dataset.id));
  getBigPicture(photoElement);
});
