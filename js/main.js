import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';
// import './picture.js';
import './big-picture.js';
// import './upload-file.js';
import './photo-scale.js';
import './photo-effects.js';
import {setFormSubmit} from './form.js';
import {renderPhotos} from './picture.js';
import {closeUploadForm} from './upload-file.js';
// import {setFormSubmit} from './form.js/';
import {getData} from './api.js';
import {showGetError} from './upload-message.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
  })
  .catch(
    () => {
      showGetError();
    }
  );

setFormSubmit(closeUploadForm);
