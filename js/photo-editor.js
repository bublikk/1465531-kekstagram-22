import {sendData} from './backend-api.js';

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadForm = document.querySelector('.img-upload__form');

const imgUploadPreview = document.querySelector('.img-upload__preview');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
let initialScale;
const SCALE_STEP = 25;

const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const imgUploadPreviewImg = document.querySelector('.img-upload__preview img');

const hashtagInput = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

// Элементы для сообщения об успешной отправки данных на сервер
const templateSuccess = document.querySelector('#success').content;
const sectionSuccess = templateSuccess.querySelector('.success');
const fragmentSuccess = document.createDocumentFragment();
const main = document.querySelector('main');

// Элементы для сообщения об ошибки отправки данных на сервер
const templateError = document.querySelector('#error').content;
const sectionError = templateError.querySelector('.error');
const fragmentError = document.createDocumentFragment();

const keydownLiestner = function(evt) {
  if (evt.key === 'Escape') {
    if (document.activeElement.className === 'text__hashtags' || document.activeElement.className === 'text__description') {
      return;
    }
    modalCloseElement();
  }
}

// Открытие формы редактирования изображения
uploadFile.addEventListener('change', function () {

  initialScale = 100;
  imgUploadPreview.style.transform = '';

  scaleControlValue.value = `${initialScale}%`;
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  // Реализация закрытия полноразмерного фото нажатием клавиши Esc
  document.addEventListener('keydown', keydownLiestner);
});

// Реализация закрытия полноразмерного фото
const modalCloseElement = function () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadInput.value = ''; // адрес загружаемого фото
  hashtagInput.value = '';
  textDescription.value = '';
  document.removeEventListener('keydown', keydownLiestner);

  document.querySelector('#effect-none').checked = true;
  imgUploadEffectLevel.classList.add('hidden');
  imgUploadPreviewImg.style.filter = 'none';
};

// Реализация закрытия полноразмерного фото нажатием на кнопку
uploadCancel.addEventListener('click', function () {
  modalCloseElement();
});

// Уменьшение размера изображения
scaleControlSmaller.addEventListener('click', function () {
  if (initialScale > 25 && initialScale <= 100) {
    initialScale -= SCALE_STEP;
    scaleControlValue.value = `${initialScale}%`;
    imgUploadPreview.style.transform = `scale(${initialScale/100})`;
  }
});

// Увеличение размера изображения
scaleControlBigger.addEventListener('click', function () {
  if (initialScale >= 25 && initialScale < 100) {
    initialScale += SCALE_STEP;
    scaleControlValue.value = `${initialScale}%`;
    imgUploadPreview.style.transform = `scale(${initialScale/100})`;
  }
});

// Отменяет событие формы по умолчанию
imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(new FormData(evt.target));
});

// Удаляет элемент с документа (закрывает окошко сообщений)
const removeElement = function () {
  let deletedElement = document.querySelector('.success');
  if (deletedElement === null){
    deletedElement = document.querySelector('.error');
  }
  deletedElement.remove();
  document.removeEventListener('keydown', keydownLiestnerMessage);
};

const keydownLiestnerMessage = function (evt) {
  if (evt.key === 'Escape') {
    removeElement();
  }
}

// Показывает окно успешной отправки
let messageSuccess = function () {
  modalCloseElement(); // Закрываем форму

  const element = sectionSuccess.cloneNode(true);
  fragmentSuccess.appendChild(element); // Добавляем элементы в наш фрагмент
  main.appendChild(fragmentSuccess);

  element.addEventListener('click', function (e) {
    if (e.target.closest('.success__inner') === null) {
      removeElement();
    }
  });

  document.querySelector('.success__button').addEventListener('click', function () {
    removeElement();
  });

  document.addEventListener('keydown', keydownLiestnerMessage);
};

// Показывает окно об ошибки отправки
let messageError = function () {
  modalCloseElement(); // Закрываем форму

  const element = sectionError.cloneNode(true);
  fragmentError.appendChild(element); // Добавляем элементы в наш фрагмент
  main.appendChild(fragmentError);

  element.addEventListener('click', function (e) {
    if (e.target.closest('.error__inner') === null) {
      removeElement();
    }
  });

  document.querySelector('.error__button').addEventListener('click', function () {
    removeElement();
  });
  document.addEventListener('keydown', keydownLiestnerMessage);
};

export {messageSuccess, messageError};
