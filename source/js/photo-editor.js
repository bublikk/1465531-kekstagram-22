import {sendData} from './backend-api.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const uploadFile = document.querySelector('.img-upload__start input[type=file]');
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
const INITIAL_SCALE_MIN = 25;
const INITIAL_SCALE_MAX = 100;
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const imgUploadPreviewImg = document.querySelector('.img-upload__preview img');
const hashtagInput = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const keydownListener = (evt) => {
  if (evt.key === 'Escape') {
    if (document.activeElement.className === 'text__hashtags' || document.activeElement.className === 'text__description') {
      return;
    }
    closeBigPicture();
  }
};

// Открытие формы редактирования изображения
uploadFile.addEventListener('change', () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      imgUploadPreviewImg.src = reader.result;
    });
    reader.readAsDataURL(file);
  } else {
    return;
  }

  initialScale = INITIAL_SCALE_MAX;
  imgUploadPreview.style.transform = '';
  scaleControlValue.value = `${initialScale}%`;
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  // Реализация закрытия полноразмерного фото нажатием клавиши Esc
  document.addEventListener('keydown', keydownListener);
});

// Реализация закрытия полноразмерного фото
const closeBigPicture = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadInput.value = ''; // адрес загружаемого фото
  hashtagInput.value = '';
  textDescription.value = '';
  document.removeEventListener('keydown', keydownListener);

  document.querySelector('#effect-none').checked = true;
  imgUploadEffectLevel.classList.add('hidden');
  imgUploadPreviewImg.style.filter = 'none';
  imgUploadPreviewImg.src = '';
};

// Реализация закрытия полноразмерного фото нажатием на кнопку
uploadCancel.addEventListener('click', () => {
  closeBigPicture();
});

// Уменьшение размера изображения
scaleControlSmaller.addEventListener('click', () => {
  if (initialScale > INITIAL_SCALE_MIN && initialScale <= INITIAL_SCALE_MAX) {
    initialScale -= SCALE_STEP;
    scaleControlValue.value = `${initialScale}%`;
    imgUploadPreview.style.transform = `scale(${initialScale/100})`;
  }
});

// Увеличение размера изображения
scaleControlBigger.addEventListener('click', () => {
  if (initialScale >= INITIAL_SCALE_MIN && initialScale < INITIAL_SCALE_MAX) {
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

export {closeBigPicture};
