import {getRandomIntInclusive} from './util.js';

// Массив с текстом комментариев
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// Массив юзернеймов
const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

// Пустой массив для проверки уникальности id комментария (заполняется из функции getUniqueId)
const unique_ids = [];

// Блок генерации и проверки уникального id комментария
const getUniqueId = function () {
  let commentId = getRandomIntInclusive(1, 1000); // 1000 тоже случайное число
  while (unique_ids.indexOf(commentId) !== -1) { // пока переменная commentId не найдена в массиве unique_ids цикл генерирует новое число
    commentId = getRandomIntInclusive(1, 1000);
  }
  unique_ids.push(commentId);
  return commentId;
}

// Блок комментария (comments - массив объектов)
const getCommentData = function () {
  const commentData = [];
  let commentTotal = getRandomIntInclusive(1, 15); // кол-во на свое усмотрение
  for (let j = 1; j <= commentTotal; j++) {
    const comment = {
      id: getUniqueId(),
      avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,  // путь до изображения
      message: MESSAGES[getRandomIntInclusive(0, MESSAGES.length - 1)],
      name: NAMES[getRandomIntInclusive(0, NAMES.length - 1)],
    }
    commentData.push(comment);
  }
  return commentData;
};

// Блок генерации массива объктов, где объекты это данные поста
const getPhotoData = function () {
  const photoData = [];
  for (let i = 1; i <= 25; i++) {
    const post = {
      id: i,
      url: `photos/${i}.jpg`,
      description: `Подпись к фото ${i}`,
      comments: getCommentData(),
      likes: getRandomIntInclusive(15, 200),
    };
    photoData.push(post);
  }
  return photoData;
};

export {getPhotoData}; // экспорт не нужен, если мы не импортируем функцию в main.js
