import {renderSmallPhotos} from './pictures-list.js';
import {onFail, messageShow} from './message.js';

// Получение данных с сервера и их отрисовка
fetch('https://22.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((pictures) => {
    renderSmallPhotos(pictures);
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
