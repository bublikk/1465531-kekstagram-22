import {getPhotoData} from './get-photo-data.js';

const picturesList = getPhotoData();

const pictures = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content; // Находим фрагмент с содержимым темплейта
const template = templateFragment.querySelector('a'); // В фрагменте находим нужный элемент
const fragment = document.createDocumentFragment();

picturesList.forEach(function (pictureItem) {
  const element = template.cloneNode(true);
  element.querySelector('img').src = pictureItem.url;
  element.querySelector('.picture__likes').textContent = pictureItem.likes;
  element.querySelector('.picture__comments').textContent = pictureItem.comments.length;
  fragment.appendChild(element); // Добавляем элементы в наш фрагмент
});

pictures.appendChild(fragment); // Добавляем наш фрагмент в блок .pictures
