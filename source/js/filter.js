import {getRandomIntInclusive} from './util.js';
import {renderSmallPicture} from './pictures-list.js';

const RANDOM_PHOTOS_COUNT = 10;

const formFilters = document.querySelector('.img-filters__form');

// Отрисовывем Обсуждаемые
const getSortedPhotos = (defaultArrayPhotos) => {
  let sortedArrayPhotos = defaultArrayPhotos.slice();
  return sortedArrayPhotos.sort((a, b) => {
    return b.comments.length - a.comments.length;
  });
};

// Генерируем 10 случайных, не повторяющихся фотографий
const getRandomPhotos = (defaultArrayPhotos, count) => {
  let randomArrayPhotos = [];
  for (let i = 0; i < count; i++) {
    let element = defaultArrayPhotos[getRandomIntInclusive(0, defaultArrayPhotos.length - 1)];
    while (randomArrayPhotos.indexOf(element) !== -1) { // пока переменная element не найдена в массиве randomArray цикл генерирует новое число
      element = defaultArrayPhotos[getRandomIntInclusive(0, defaultArrayPhotos.length - 1)];
    }
    randomArrayPhotos.push(element);
  }
  return randomArrayPhotos;
};

const filter = (evt, defaultArrayPhotos) => {
  // Переключение фильтров
  for (let i = 0; i < formFilters.children.length; i++) {
    formFilters.children[i].classList.remove('img-filters__button--active');
  }
  evt.target.classList.add('img-filters__button--active');
  // Обработка фильтров
  if (evt.target.id === 'filter-discussed'){
    // Отрисовываем обсуждаемый массив
    renderSmallPicture(getSortedPhotos(defaultArrayPhotos));
  } else if (evt.target.id === 'filter-random'){
    // Отрисовываем случайный массив
    renderSmallPicture(getRandomPhotos(defaultArrayPhotos, RANDOM_PHOTOS_COUNT));
  } else {
    // Отрисовывем стандартный массив
    renderSmallPicture(defaultArrayPhotos);
  }
};

const setFilter = (cb) => {
  formFilters.addEventListener('click', (evt) => {
    cb(evt);
  });
};

export {filter, setFilter};
