/* global _:readonly */
import {getRandomIntInclusive} from './util.js';
import {renderSmallPhotos} from './pictures-list.js';

const imgFilters = document.querySelector('.img-filters');
const formFilters = document.querySelector('.img-filters__form');

const RERENDER_DELAY = 500;

const renderFilter = function (picturesList) {
  // Показываем фильтры
  imgFilters.classList.remove('img-filters--inactive');

  // Делаем копию массива с сервера
  const defaultArray = picturesList.slice();

  // По умолчанию отрисовывем стандартный массив
  renderSmallPhotos(defaultArray);

  // Обрабатываем клик на фильтр
  formFilters.addEventListener('click', function (evt) {

    // Переключение фильтров
    for (let i = 0; i < formFilters.children.length; i++) {
      formFilters.children[i].classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');

    // Обработка фильтров
    if (evt.target.id === 'filter-discussed'){
      let sortedArray = defaultArray.slice();
      // Отрисовывем Обсуждаемые
      sortedArray.sort(function (a, b) {
        if (a.comments.length > b.comments.length) {
          return -1;
        }
        if (a.comments.length < b.comments.length) {
          return 1;
        }
        // a должно быть равным b
        return 0;
      });
      clickCb(_.debounce(
        () => renderSmallPhotos(sortedArray),
        RERENDER_DELAY,
      ));
    }
    else if (evt.target.id === 'filter-random'){
      // Генерируем случайный массив
      let randomArray = [];
      for (let i = 0; i < 10; i++) {
        let element = picturesList[getRandomIntInclusive(0, picturesList.length -1)];
        while (randomArray.indexOf(element) !== -1) { // пока переменная element не найдена в массиве randomArray цикл генерирует новое число
          element = picturesList[getRandomIntInclusive(0, picturesList.length -1)];
        }
        randomArray.push(element);
      }
      // Отрисовывем случайный массив
      clickCb(_.debounce(
        () => renderSmallPhotos(randomArray),
        RERENDER_DELAY,
      ));
    } else {
      // Отрисовывем стандартный массив
      clickCb(_.debounce(
        () => renderSmallPhotos(defaultArray),
        RERENDER_DELAY,
      ));
    }

  })

}

const clickCb = (cb) => {
  cb();
};

export {renderFilter};
