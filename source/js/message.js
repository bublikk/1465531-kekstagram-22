import {closeBigPicture} from './photo-editor.js';

const main = document.querySelector('main');
const ALERT_SHOW_TIME = 5000;

const showFatalError = (textError) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
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

// Удаляет элемент с документа (закрывает окошко сообщений)
const closeMessage = () => {
  let deletedElement = document.querySelector('.success');

  if (deletedElement === null){
    deletedElement = document.querySelector('.error');
  }
  deletedElement.remove();
  document.removeEventListener('keydown', keydownListenerMessage);
};

const keydownListenerMessage = (evt) => {
  if (evt.key === 'Escape') {
    closeMessage();
  }
};

// Показывает окно успешной отправки
let showMessage = (messageType) => {
  const template = document.querySelector(`#${messageType}`).content;
  const section = template.querySelector(`.${messageType}`);
  const fragment = document.createDocumentFragment();
  closeBigPicture(); // Закрываем форму

  const element = section.cloneNode(true);
  fragment.appendChild(element); // Добавляем элементы в наш фрагмент
  main.appendChild(fragment);

  element.addEventListener('click', (evt) => {
    if (evt.target.closest(`.${messageType}__inner`) === null) {
      closeMessage();
    }
  });

  document.querySelector(`.${messageType}__button`).addEventListener('click', () => {
    closeMessage();
  });

  document.addEventListener('keydown', keydownListenerMessage);
};

export {showFatalError, showMessage};
