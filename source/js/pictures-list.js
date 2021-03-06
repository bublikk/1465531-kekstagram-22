import {getBigPicture} from './get-big-picture.js';

const pictures = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content; // Находим фрагмент с содержимым темплейта
const template = templateFragment.querySelector('a'); // В фрагменте находим нужный элемент
const fragment = document.createDocumentFragment(); // Создаем коробочку для хранения сгенерированных элементов

// Создаем функцию, которая будет отрисовывать данные с сервера
const renderSmallPicture = (picturesList) => {
  // Перед отрисовкой удаляем детей
  const images = document.querySelectorAll('.pictures a');
  for (let i = 0; i < images.length; i++) {
    images[i].removeEventListener('click', getBigPicture);
    images[i].remove();
  }

  picturesList.forEach((pictureItem) => { // Обходим массив pictureList (итератор pictureItem)
    const element = template.cloneNode(true); // Клонируем шаблон (создаем элемент)
    element.querySelector('.picture__img').src = pictureItem.url; // Находим в этом элементе img и прописываем в его свойство "src" значение равное значению из элемента нашего массива pictureList
    element.querySelector('.picture__likes').textContent = pictureItem.likes;
    element.querySelector('.picture__comments').textContent = pictureItem.comments.length;
    fragment.appendChild(element); // Добавляем элементы в наш фрагмент

    element.addEventListener('click', () => {
      getBigPicture(pictureItem);
    })
  });

  pictures.appendChild(fragment); // Добавляем наш фрагмент в блок .pictures
};

export {renderSmallPicture};
