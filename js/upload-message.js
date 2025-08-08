import {isEscapeKey} from './util.js';
import {onDocumentByUploadFileKeydown} from './upload-file.js';

const ALERT_SHOW_TIME = 5000;
const body = document.querySelector('body');

let massageTemplateId = '';

const closeMessage = () => {
  body.querySelector(`.${massageTemplateId}`).remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onAroundModalClick);
  if (massageTemplateId === 'error') {
    document.addEventListener('keydown', onDocumentByUploadFileKeydown);
  }
  massageTemplateId = '';
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

function onAroundModalClick (evt) {
  const target = evt.target.closest(`.${massageTemplateId}__inner`);
  if (target) {
    return;
  }
  closeMessage();
}

const renderMessage = (messageId) => {
  massageTemplateId = messageId;
  const messageTemplate = document.querySelector(`#${messageId}`).content;
  const messageElement = messageTemplate.cloneNode(true);
  body.appendChild(messageElement);
};


const showGetError = () => {
  renderMessage('data-error');
  setTimeout(() => {
    body.querySelector('.data-error').remove();
    massageTemplateId = '';
  }, ALERT_SHOW_TIME);
};

const createAction = () => {
  const messageButton = document.querySelector(`.${massageTemplateId}__button`);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onAroundModalClick);
  messageButton.addEventListener('click', closeMessage);
};

const showPostSuccess = () => {
  renderMessage('success');
  createAction();
};


const showPostError = () => {
  renderMessage('error');
  createAction();
  document.removeEventListener('keydown', onDocumentByUploadFileKeydown);
};

export {
  showGetError,
  showPostError,
  showPostSuccess
};
