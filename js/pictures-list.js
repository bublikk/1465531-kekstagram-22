import {getPhotoData} from './get-photo-data.js'; // Импорт функции getPhotoData

const picturesList = getPhotoData(); // Данная переменная хранит результат вызванной функции (массив)

const pictures = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content; // Находим фрагмент с содержимым темплейта
const template = templateFragment.querySelector('a'); // В фрагменте находим нужный элемент
const fragment = document.createDocumentFragment(); // Создаем коробочку для хранения сгенерированных элементов

picturesList.forEach(function (pictureItem) { // Обходим массив pictureList (итератор pictureItem)
  const element = template.cloneNode(true); // Клонируем шаблон (создаем элемент)
  element.querySelector('.picture__img').src = pictureItem.url; // Находим в этом элементе img и прописываем в его свойство "src" значение равное значению из элемента нашего массива pictureList
  element.querySelector('.picture__likes').textContent = pictureItem.likes;
  element.querySelector('.picture__comments').textContent = pictureItem.comments.length;
  fragment.appendChild(element); // Добавляем элементы в наш фрагмент
});

pictures.appendChild(fragment); // Добавляем наш фрагмент в блок .pictures
