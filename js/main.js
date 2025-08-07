import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';
import {setFormSubmit} from './form.js';
import {renderPhotos} from './picture.js';
import {setImgClick} from './big-picture.js';
import {closeUploadForm} from './upload-file.js';
import {getData} from './api.js';
import {showGetError} from './upload-message.js';
import {showFilters} from './filters.js';
import './preview.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
    showFilters(photos);
    setImgClick(photos);
  })
  .catch(
    () => {
      showGetError();
    }
  );

setFormSubmit(closeUploadForm);
