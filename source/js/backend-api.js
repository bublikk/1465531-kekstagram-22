/* global _:readonly */
import {setFilter, filter} from './filter.js';
import {renderSmallPicture} from './pictures-list.js';
import {showFatalError, showMessage} from './message.js';

const RERENDER_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');

// Получение данных с сервера и их отрисовка
fetch('https://22.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((pictures) => {
    imgFilters.classList.remove('img-filters--inactive');
    renderSmallPicture(pictures);
    setFilter(_.debounce(
      (evt) => filter(evt, pictures),
      RERENDER_DELAY,
    ));
  })
  .catch(() => {
    showFatalError('Не удалось получить данные с сервера. Попробуйте позже');
  });

// Отправка данных на сервер
const sendData = (formData) => {
  fetch(
    'https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      response.ok ? showMessage('success') : showMessage('error')
    })
    .catch(() => {
      showMessage('error');
    });
};

export {sendData};
