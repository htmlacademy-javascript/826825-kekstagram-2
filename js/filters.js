import {renderPhotos} from './picture.js';
import {debounce} from './util.js';
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

const showFilters = (data) => {
  imgFilters.classList.remove('img-filters--inactive');
  photosData = data.slice();
};

const debounceRenderPhotos = debounce(renderPhotos, RERENDER_DELAY);

const applyFilters = () => {
  if (currentFilter.id === FILTER.random) {
    debounceRenderPhotos(photosData.slice(0, SHOW_ITEMS).sort(() => 0.5 - Math.random()));
  }

  if (currentFilter.id === FILTER.discussed) {
    debounceRenderPhotos(photosData.slice().sort((a, b) => b.comments.length - a.comments.length));
  }

  if (currentFilter.id === FILTER.default) {
    debounceRenderPhotos(photosData.slice());
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

export {showFilters};
