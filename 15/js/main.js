import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';
import {setFormSubmit} from './form.js';
import {closeUploadForm} from './upload-file.js';
import {getData} from './api.js';
import {showGetError} from './upload-message.js';
import {initPhotos} from './filters.js';
import './preview.js';

getData()
  .then((photos) => {
    initPhotos(photos);
  })
  .catch(
    () => {
      showGetError();
    }
  );

setFormSubmit(closeUploadForm);
