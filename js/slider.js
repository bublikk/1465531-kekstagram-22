/* global noUiSlider:readonly */
import '../nouislider/nouislider.js';

const imgUploadPreviewImg = document.querySelector('.img-upload__preview img');
const effectsMapRadioButtons  = document.querySelectorAll('.effects__radio');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const initialFilterValue = 100;
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
let currentEffect = 'none';

effectLevelValue.type = '';

const effectsMap = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
    filter: 'grayscale',
    unit: '',
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
    filter: 'sepia',
    unit: '',
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
    filter: 'invert',
    unit: '%',
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3,
    filter: 'blur',
    unit: 'px',
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3,
    filter: 'brightness',
    unit: '',
  },
};

// Скрывает слайдер у оригинала
imgUploadEffectLevel.classList.add('hidden');

for (let effectRadioButton of effectsMapRadioButtons) {
  effectRadioButton.addEventListener('change', function(evt) {
    currentEffect = evt.target.value;

    // Сначала убираем все фильтры с большого фото, а потом накладываем выбранный (на который кликнули)
    while (imgUploadPreviewImg.classList.length > 0) {
      imgUploadPreviewImg.classList.remove(imgUploadPreviewImg.classList.item(0));
    }
    imgUploadPreviewImg.classList.add(`effectsMap__preview--${currentEffect}`);

    effectLevelValue.value = initialFilterValue;
    if (currentEffect === 'none') {
      imgUploadEffectLevel.classList.add('hidden');
      imgUploadPreviewImg.style.filter = 'none';
    } else {
      imgUploadEffectLevel.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: effectsMap[currentEffect].range.min,
          max: effectsMap[currentEffect].range.max,
        },
        step: effectsMap[currentEffect].step,
        start: effectsMap[currentEffect].start,
      });
    }
  });
}

// Слайдер effectLevelSlider

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

  if (currentEffect !== 'none') {
    imgUploadPreviewImg.style.filter = `${effectsMap[currentEffect].filter}(${effectLevelValue.value}${effectsMap[currentEffect].unit})`;
  }
});
