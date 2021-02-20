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

const imgUploadPreviewImg = document.querySelector('.img-upload__preview img');
const previewClassList = document.querySelector('.img-upload__preview img').classList;
const effectsRadioButtons  = document.querySelectorAll('.effects__radio');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
let initialFilterValue = 100;
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');


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

// Слайдер

// Скрывает слайдер у оригинала
imgUploadEffectLevel.classList.add('hidden');

for (let effectRadioButton of effectsRadioButtons) {
  effectRadioButton.addEventListener('change', function(evt) {
    if (evt.target.value === 'none') {
      imgUploadEffectLevel.classList.add('hidden');
    } else {
      imgUploadEffectLevel.classList.remove('hidden');
    }

    // Сначала убираем все фильтры с большого фото, а потом накладываем выбранный (на который кликнули)
    while (previewClassList.length > 0) {
      previewClassList.remove(previewClassList.item(0));
    }
    previewClassList.add(`effects__preview--${evt.target.value}`);
    effectLevelValue.value = initialFilterValue;

    let currentEffect = previewClassList.item(0);
    if (currentEffect === 'effects__preview--chrome' || currentEffect === 'effects__preview--sepia') {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 1,
      });
    } else if (currentEffect === 'effects__preview--marvin') {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
        start: 100,
      });
    } else if (currentEffect === 'effects__preview--phobos') {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });
    } else if (currentEffect === 'effects__preview--heat') {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });
    }

  });
}

// Слайдер effectLevelSlider
effectLevelValue.value = initialFilterValue;

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
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

  if (currentEffect === 'effects__preview--chrome') {
    imgUploadPreviewImg.style.filter = `grayscale(${effectLevelValue.value})`;
  } else if (currentEffect === 'effects__preview--sepia') {
    imgUploadPreviewImg.style.filter = `sepia(${effectLevelValue.value})`;
  } else if (currentEffect === 'effects__preview--marvin') {
    imgUploadPreviewImg.style.filter = `invert(${effectLevelValue.value}%)`;
  } else if (currentEffect === 'effects__preview--phobos') {
    imgUploadPreviewImg.style.filter = `blur(${effectLevelValue.value}px)`;
  } else if (currentEffect === 'effects__preview--heat') {
    imgUploadPreviewImg.style.filter = `brightness(${effectLevelValue.value})`;
  }

  /*
  if (currentEffect === 'effects__preview--chrome') {
    imgUploadPreviewImg.style.filter = `grayscale(${effectLevelValue.value})`;
  } else if (currentEffect === 'effects__preview--sepia') {
    imgUploadPreviewImg.style.filter = `sepia(${effectLevelValue.value})`;
  } else if (currentEffect === 'effects__preview--marvin') {
    imgUploadPreviewImg.style.filter = `invert(${effectLevelValue.value * 100}%)`;
  } else if (currentEffect === 'effects__preview--phobos') {
    imgUploadPreviewImg.style.filter = `blur(${effectLevelValue.value * 3}px)`;
  } else if (currentEffect === 'effects__preview--heat') {
    imgUploadPreviewImg.style.filter = `brightness(${effectLevelValue.value * 2 + 1})`;
  }
  */

});
