import {getPhotoData} from './get-photo-data.js'; // Импорт функции getPhotoData

const picturesList = getPhotoData(); // Данная переменная хранит результат вызванной функции (массив)

const pictures = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content; // Находим фрагмент с содержимым темплейта
const template = templateFragment.querySelector('a'); // В фрагменте находим нужный элемент
const fragment = document.createDocumentFragment(); // Создаем коробочку для хранения сгенерированных элементов

// Задание #2
const fullPhoto = document.querySelector('.big-picture'); // Получем элемент большого фото
const userModalCloseElement = fullPhoto.querySelector('.big-picture__cancel');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');

let addThumbnailClickHandler = function (element, pictureItem) { // Функция ждет созданным нами (cloneNode) новый элемент И данные фото которые мы сгенерировали в get-photo-data
  element.addEventListener('click', function () { // Добавляем слушатель клик на наш новый элемент

    // Что должно происходить при наступлении события "клик"

    fullPhoto.classList.remove('hidden'); // Показываем большое фото
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    body.classList.add('modal-open');

    // Заполняем параметры элементов большого фото - данными из наших сгенерированных данных (get-photo-data)
    fullPhoto.querySelector('img').src = pictureItem.url;
    fullPhoto.querySelector('.likes-count').textContent = pictureItem.likes;
    fullPhoto.querySelector('.comments-count').textContent = pictureItem.comments.length;
    fullPhoto.querySelector('.social__caption').textContent = pictureItem.description;

    // Получем элемент UL который хранит комментарии большого фото
    let socialComments = fullPhoto.querySelector('.social__comments');

    // Удаляем текущие (добавленные ранее) комментарии
    for (let i = socialComments.children.length - 1; i >= 0; i--) {
      const child = socialComments.children[i];
      child.parentElement.removeChild(child);
    }

    // Обходим массив комментариев из get-photo-data и на их основе создаем LI в котором IMG и P, и добавляем их в комментарии большого фото
    for (let j = 0; j < pictureItem.comments.length; j++) {
      let currentComment = pictureItem.comments[j];

      const commentLi = document.createElement('li');
      commentLi.classList.add('social__comment');

      const commentImg = document.createElement('img');
      commentImg.classList.add('social__picture');
      commentImg.src = currentComment.avatar;
      commentImg.alt = currentComment.name;
      commentImg.width = 35;
      commentImg.height = 35;
      commentLi.appendChild(commentImg);

      const commentText = document.createElement('p');
      commentText.classList.add('social__text');
      commentText.textContent = currentComment.message;
      commentLi.appendChild(commentText);

      socialComments.appendChild(commentLi);
    }
  });
};

// Задание #1
picturesList.forEach(function (pictureItem) { // Обходим массив pictureList (итератор pictureItem)
  const element = template.cloneNode(true); // Клонируем шаблон (создаем элемент)
  element.querySelector('.picture__img').src = pictureItem.url; // Находим в этом элементе img и прописываем в его свойство "src" значение равное значению из элемента нашего массива pictureList
  element.querySelector('.picture__likes').textContent = pictureItem.likes;
  element.querySelector('.picture__comments').textContent = pictureItem.comments.length;
  fragment.appendChild(element); // Добавляем элементы в наш фрагмент

  // Задание #2
  addThumbnailClickHandler(element, pictureItem);
});

pictures.appendChild(fragment); // Добавляем наш фрагмент в блок .pictures

// Реализация закрытия полноразмерного фото
userModalCloseElement.addEventListener('click', function () {
  fullPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
});
