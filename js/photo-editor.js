import {modalCloseElement} from './util.js';
import '../nouislider/nouislider.js';

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');

const imgUploadPreview = document.querySelector('.img-upload__preview');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
let scaleControlValue = document.querySelector('.scale__control--value');
let initialScale = 100;
const SCALE_STEP = 25;

// Открытие формы редактирования изображения
uploadFile.addEventListener('change', function () {
  scaleControlValue.value = `${initialScale}%`;
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
});

// Реализация закрытия полноразмерного фото нажатием на кнопку
modalCloseElement(uploadCancel, imgUploadOverlay);

// Реализация закрытия полноразмерного фото нажатием клавиши Esc
document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
  }
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

////////////////////////////////

const imgUploadPreviewImg = document.querySelector('.img-upload__preview img');
const previewClassList = document.querySelector('.img-upload__preview img').classList;
const effectsRadioButtons  = document.querySelectorAll('.effects__radio');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
let initialFilterValue = 100;

for (let effectRadioButton of effectsRadioButtons) {
  effectRadioButton.addEventListener('change', (evt) => {
    while (previewClassList.length > 0) {
      previewClassList.remove(previewClassList.item(0));
    }
    previewClassList.add(`effects__preview--${evt.target.value}`);
  });
}

// Слайдер effectLevelSlider
effectLevelValue.value = initialFilterValue;

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

effectLevelSlider.noUiSlider.on('update', function (values, handle) {
  effectLevelValue.value = values[handle];
  let currentEffect = previewClassList.item(0);
  if (currentEffect === 'effects__preview--phobos') {
    imgUploadPreviewImg.style.filter = `blur(${effectLevelValue.value}px)`;
  } else if (currentEffect === 'effects__preview--chrome') {
    imgUploadPreviewImg.style.filter = `grayscale(${effectLevelValue.value})`;
  } else if (currentEffect === 'effects__preview--sepia') {
    imgUploadPreviewImg.style.filter = `sepia(${effectLevelValue.value})`;
  } else if (currentEffect === 'effects__preview--marvin') {
    imgUploadPreviewImg.style.filter = `invert(${effectLevelValue.value}%)`;
  } else if (currentEffect === 'effects__preview--heat') {
    imgUploadPreviewImg.style.filter = `brightness(${effectLevelValue.value})`;
  } else {
    imgUploadPreviewImg.style.filter = '';
  }
});


/*
const effectNone = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');
*/

/*
for (let effectRadioButton of effectsRadioButtons) {
  effectRadioButton.addEventListener('change', (evt) => {
    console.log(evt.target.checked);
    if (evt.target.checked) {
      // Цена и шаг в десять раз меньше
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 10,
        },
        start: 100,
        step: 0.1,
      });
    } else {
      // Цена и шаг по умолчанию
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
      });
      effectLevelSlider.noUiSlider.set(100);
    }
  });
}
*/
