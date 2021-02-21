const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const imgUploadInput = document.querySelector('.img-upload__input');

const imgUploadPreview = document.querySelector('.img-upload__preview');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
let initialScale = 100;
const SCALE_STEP = 25;

const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const imgUploadPreviewImg = document.querySelector('.img-upload__preview img');

const keydownLiestner = function(evt) {
  if (evt.key === 'Escape') {
    modalCloseElement();
  }
}

// Открытие формы редактирования изображения
uploadFile.addEventListener('change', function () {

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
  imgUploadInput.value = ''; // это адрес загружаемого фото (пока не используется, но по ТЗ есть)
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
