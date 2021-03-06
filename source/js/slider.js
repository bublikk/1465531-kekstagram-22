import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

const imgUploadPreviewImg = document.querySelector('.img-upload__preview img');
const effectsMapRadioButtons  = document.querySelectorAll('.effects__radio');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const INITIAL_FILTER_VALUE = 100;
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
let currentEffect = 'none';

const EffectsMap = {
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
  effectRadioButton.addEventListener('change', (evt) => {
    currentEffect = evt.target.value;

    // Сначала убираем все фильтры с большого фото, а потом накладываем выбранный (на который кликнули)
    while (imgUploadPreviewImg.classList.length > 0) {
      imgUploadPreviewImg.classList.remove(imgUploadPreviewImg.classList.item(0));
    }
    imgUploadPreviewImg.classList.add(`effectsMap__preview--${currentEffect}`);

    effectLevelValue.value = INITIAL_FILTER_VALUE;
    if (currentEffect === 'none') {
      imgUploadEffectLevel.classList.add('hidden');
      imgUploadPreviewImg.style.filter = 'none';
    } else {
      imgUploadEffectLevel.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: EffectsMap[currentEffect].range.min,
          max: EffectsMap[currentEffect].range.max,
        },
        step: EffectsMap[currentEffect].step,
        start: EffectsMap[currentEffect].start,
      });
    }
  });
}

// Слайдер
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => {
      return parseFloat(value);
    },
  },
});

effectLevelSlider.noUiSlider.on('update', (values, handle) => {
  effectLevelValue.value = values[handle];

  if (currentEffect !== 'none') {
    imgUploadPreviewImg.style.filter = `${EffectsMap[currentEffect].filter}(${effectLevelValue.value}${EffectsMap[currentEffect].unit})`;
  }
});
