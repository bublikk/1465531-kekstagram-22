import {modalCloseElement} from './util.js';

// Задание #2
const COMMENT_IMG_SIZE = 35;
const bigPicture = document.querySelector('.big-picture'); // Получем элемент большого фото
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');

function getBigPicture(pictureItem) { // Функция ждет созданным нами (cloneNode) новый элемент И данные фото которые мы сгенерировали в get-photo-data
  // Что должно происходить при наступлении события "клик"

  bigPicture.classList.remove('hidden'); // Показываем большое фото
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');

  // Заполняем параметры элементов большого фото - данными из наших сгенерированных данных (get-photo-data)
  bigPicture.querySelector('.big-picture__img img').src = pictureItem.url;
  bigPicture.querySelector('.likes-count').textContent = pictureItem.likes;
  bigPicture.querySelector('.comments-count').textContent = pictureItem.comments.length;
  bigPicture.querySelector('.social__caption').textContent = pictureItem.description;

  // Получем элемент UL который хранит комментарии большого фото
  const socialComments = bigPicture.querySelector('.social__comments');

  // Удаляем текущие (добавленные ранее) комментарии
  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }

  // Обходим массив комментариев из get-photo-data и на их основе создаем LI в котором IMG и P, и добавляем их в комментарии большого фото
  for (let j = 0; j < pictureItem.comments.length; j++) {
    const currentComment = pictureItem.comments[j];

    const commentLi = document.createElement('li');
    commentLi.classList.add('social__comment');

    const commentImg = document.createElement('img');
    commentImg.classList.add('social__picture');
    commentImg.src = currentComment.avatar;
    commentImg.alt = currentComment.name;
    commentImg.width = COMMENT_IMG_SIZE;
    commentImg.height = COMMENT_IMG_SIZE;

    commentLi.appendChild(commentImg);

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = currentComment.message;
    commentLi.appendChild(commentText);

    socialComments.appendChild(commentLi);
  }
}

export {getBigPicture};

// Реализация закрытия полноразмерного фото
modalCloseElement(bigPictureCancel, bigPicture);
