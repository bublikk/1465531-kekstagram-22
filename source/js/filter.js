import {getRandomIntInclusive} from './util.js';
import {renderSmallPhotos} from './pictures-list.js';

const formFilters = document.querySelector('.img-filters__form');

// Отрисовывем Обсуждаемые
const sortedByCommentsCount = (array) => {
  let sortedArray = array.slice();
  return sortedArray.sort(function (a, b) {
    return b.comments.length - a.comments.length;
  });
}

// Генерируем 10 случайных, не повторяющихся фотографий
const getRandomElements = (array, count) => {
  let randomArray = [];
  for (let i = 0; i < count; i++) {
    let element = array[getRandomIntInclusive(0, array.length -1)];
    while (randomArray.indexOf(element) !== -1) { // пока переменная element не найдена в массиве randomArray цикл генерирует новое число
      element = array[getRandomIntInclusive(0, array.length -1)];
    }
    randomArray.push(element);
  }
  return randomArray;
}

const filter = function (evt, defaultArray) {
  // Переключение фильтров
  for (let i = 0; i < formFilters.children.length; i++) {
    formFilters.children[i].classList.remove('img-filters__button--active');
  }
  evt.target.classList.add('img-filters__button--active');

  // Обработка фильтров
  if (evt.target.id === 'filter-discussed'){
    // Отрисовываем обсуждаемый массив
    renderSmallPhotos(sortedByCommentsCount(defaultArray));
  } else if (evt.target.id === 'filter-random'){
    // Отрисовываем случайный массив
    renderSmallPhotos(getRandomElements(defaultArray, 10));
  } else {
    // Отрисовывем стандартный массив
    renderSmallPhotos(defaultArray);
  }
}

const setFilter = (cb) => {
  formFilters.addEventListener('click', (evt) => {
    cb(evt);
  });
};

export {filter, setFilter};
