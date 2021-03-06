/* global _:readonly */
import {setFilter, filter} from './filter.js';
import {renderSmallPhotos} from './pictures-list.js';
import {onFail, messageShow} from './message.js';

const imgFilters = document.querySelector('.img-filters');
const RERENDER_DELAY = 500;

// Получение данных с сервера и их отрисовка
fetch('https://22.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((pictures) => {
    imgFilters.classList.remove('img-filters--inactive');
    renderSmallPhotos(pictures);
    setFilter(_.debounce(
      (evt) => filter(evt, pictures),
      RERENDER_DELAY,
    ));
  })
  .catch(() => {
    onFail('Не удалось получить данные с сервера. Попробуйте позже');
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
      if (response.ok) {
        messageShow('success');
      } else {
        messageShow('error');
      }
    })
    .catch(() => {
      messageShow('error');
    });
};

export {sendData};
