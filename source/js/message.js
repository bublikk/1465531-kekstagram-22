import {closeBigPicture} from './photo-editor.js';

const ALERT_SHOW_TIME = 5000;

const main = document.querySelector('main');

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
const closeMessage = (evt) => {
  const deletedElementName = document.querySelector('.success') === null ? '.error' : '.success';
  if (evt !== undefined) {
    if (evt.target.className.includes('__inner') || evt.target.className.includes('__title')) {
      return;
    }
  }
  document.querySelector(`${deletedElementName}__button`).removeEventListener('click', closeMessage);
  const deletedElement = document.querySelector(`${deletedElementName}`);
  deletedElement.removeEventListener('click', closeMessage);
  deletedElement.remove();
  document.removeEventListener('keydown', keydownListenerMessage);
};

const keydownListenerMessage = (evt) => {
  if (evt.key === 'Escape') {
    closeMessage();
  }
};

// Показывает окно отправки (успешной и не успешной)
let showMessage = (messageType) => {
  const template = document.querySelector(`#${messageType}`).content;
  const section = template.querySelector(`.${messageType}`);
  const fragment = document.createDocumentFragment();
  closeBigPicture(); // Закрываем форму

  const element = section.cloneNode(true);
  fragment.appendChild(element);
  element.addEventListener('click', closeMessage);

  main.appendChild(fragment);

  document.querySelector(`.${messageType}__button`).addEventListener('click', closeMessage);
  document.addEventListener('keydown', keydownListenerMessage);
};

export {showFatalError, showMessage};
