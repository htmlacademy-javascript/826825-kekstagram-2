const COMMENTS_STEP = 5;
let userComments = [];
let currentCount = 0;

const bigPicture = document.querySelector('.big-picture');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsWrapper = bigPicture.querySelector('.social__comments');
const commentTemplate = bigPicture.querySelector('.social__comment');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentCountShow = socialCommentCount.querySelector('.social__comment-shown-count');
const totalCommentCount = socialCommentCount.querySelector('.social__comment-total-count');

const renderNextComments = () => {
  const commentsArray = userComments.slice(currentCount, currentCount + COMMENTS_STEP);
  totalCommentCount.textContent = userComments.length;
  const commentCountShowLength = commentsArray.length + currentCount;
  commentCountShow.textContent = commentCountShowLength;

  const userCommentFragment = document.createDocumentFragment();

  commentsArray.forEach(({avatar, message, name}) => {
    const userComment = commentTemplate.cloneNode(true);
    userComment.querySelector('.social__text').textContent = message;
    userComment.querySelector('img').src = avatar;
    userComment.querySelector('img').alt = name;

    userCommentFragment.appendChild(userComment);
  });

  commentsWrapper.appendChild(userCommentFragment);

  if (commentCountShowLength >= userComments.length) {
    commentsLoader.classList.add('hidden');
  }

  currentCount += COMMENTS_STEP;
};

const removeComments = () => {
  currentCount = 0;
  commentsLoader.classList.remove('hidden');
  commentsWrapper.innerHTML = '';
  commentsLoader.removeEventListener('click', renderNextComments);
};

const renderComments = (comments) => {
  if (commentsWrapper.childNodes.length) {
    removeComments();
  }

  userComments = comments.slice();
  renderNextComments();
  commentsLoader.addEventListener('click', renderNextComments);
};

export {renderComments, removeComments};
