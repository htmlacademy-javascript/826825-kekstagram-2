import {renderPhotos} from './picture.js';
import {debounce} from './util.js';
import {setImgClick} from './big-picture.js';

const RERENDER_DELAY = 500;
const SHOW_ITEMS = 10;

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

const imgFilters = document.querySelector('.img-filters');

let currentFilter = '';
let photosData = [];

const getShufflePhotos = (photos) => photos.slice().sort(() => 0.5 - Math.random());
const getSortedPhotos = (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length);

const initPhotos = (data) => {
  photosData = data.slice();
  renderPhotos(photosData);
  imgFilters.classList.remove('img-filters--inactive');
  setImgClick(photosData);
};

const debounceRenderPhotos = debounce(renderPhotos, RERENDER_DELAY);

const applyFilters = () => {

  switch(currentFilter.id) {

    case FILTER.random:
      debounceRenderPhotos(getShufflePhotos(photosData).slice(0, SHOW_ITEMS));
      break;

    case FILTER.discussed:
      debounceRenderPhotos(getSortedPhotos(photosData));
      break;

    case FILTER.default:
      debounceRenderPhotos(photosData.slice());
      break;
  }
};

const changeActiveFilter = () => {
  const activeButton = imgFilters.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
  currentFilter.classList.add('img-filters__button--active');
};

const onImgFiltersClick = (evt) => {
  const target = evt.target;
  if (target.type !== 'button') {
    return;
  }
  currentFilter = target;

  changeActiveFilter();
  applyFilters();
};

imgFilters.addEventListener('click', onImgFiltersClick);

export {initPhotos};
