import {cutComments} from './comment.js';

const COMMENT_IMG_SIZE = 35;

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');

const getBigPicture = (pictureItem) => {
  document.addEventListener('keydown', closeBigPictureListener);
  bigPicture.classList.remove('hidden');
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

    cutComments();
  }
};

// Реализация закрытия полноразмерного фото
bigPictureCancel.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeBigPictureListener);
});

const closeBigPictureListener = (evt) => {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeBigPictureListener);
  }
};

export {getBigPicture};
