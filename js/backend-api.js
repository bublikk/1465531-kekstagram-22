import {renderSmallPhotos} from './pictures-list.js';
import {messageSuccess, messageError} from './photo-editor.js';

const ALERT_SHOW_TIME = 5000;

// Получение данных с сервера и их отрисовка

const onSuccess = function (serverData) {
  renderSmallPhotos(serverData);
};

const onFail = function (textError) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = textError;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

fetch('https://22.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((pictures) => {
    onSuccess(pictures);
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
      formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        messageSuccess();
      } else {
        messageError();
        //messageSuccess();
      }
    })
    .catch(() => {
      messageError();
      //messageSuccess();
    });
};

export {sendData};
