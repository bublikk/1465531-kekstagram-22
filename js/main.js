//проверка максимальной длины строки
const checkStringLength = function (initialString, maxLength) {
  return initialString.length <= maxLength;
}

checkStringLength('', 10);

// возвращает случайное целое число от min (вкл) до max (вкл)
// диапазон только положительный (вкл 0)
// если значение max <= min, то вернет -1
const getRandomIntInclusive = function (min, max) {
  min = Math.floor(min);
  max = Math.floor(max);
  return min >= 0 && max > min
    ? Math.floor(Math.random() * (max - min + 1)) + min
    : -1;
};

//массив с описаниями фото
const DESCRIPTIONS = [
  'Подпись к фото 1',
  'Подпись к фото 2',
  'Подпись к фото 3',
  'Подпись к фото 4',
  'Подпись к фото 5',
  'Подпись к фото 6',
  'Подпись к фото 7',
  'Подпись к фото 8',
  'Подпись к фото 9',
  'Подпись к фото 10',
  'Подпись к фото 11',
  'Подпись к фото 12',
  'Подпись к фото 13',
  'Подпись к фото 14',
  'Подпись к фото 15',
  'Подпись к фото 16',
  'Подпись к фото 17',
  'Подпись к фото 18',
  'Подпись к фото 19',
  'Подпись к фото 20',
  'Подпись к фото 21',
  'Подпись к фото 22',
  'Подпись к фото 23',
  'Подпись к фото 24',
  'Подпись к фото 25',
];

//массив с текстом комментариев
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

//массив юзернеймов
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

//пустой массив для проверки уникальности id комментария (заполняется из функции getUniqueId)
const UNIQUE_ID = [];

//блок генерации и проверки уникального id комментария
const getUniqueId = function () {
  let commentId = getRandomIntInclusive(1, 1000);
  while (UNIQUE_ID.indexOf(commentId) != -1) { //пока переменная commentId не найдена в массиве UNIQUE_ID цикл генерирует новое число
    commentId = getRandomIntInclusive(1, 1000);
  }
  UNIQUE_ID.push(commentId);
  return commentId;
}

//блок комментария (comments - массив объектов)
const getCommentData = function () {
  let commentData = [];
  let commentTotal = getRandomIntInclusive(1, 15);
  for (let j = 1; j <= commentTotal; j++){
    let comment = {
      id: getUniqueId(),
      avatar: 'img/avatar-' + getRandomIntInclusive(1, 6) +'.svg',  //количество аватаров
      message: MESSAGES[getRandomIntInclusive(0, MESSAGES.length - 1)],
      name: NAMES[getRandomIntInclusive(0, NAMES.length - 1)],
    }
    commentData.push(comment);
  }
  return commentData;
};


//блок генерации массива объктов, где объекты это данные поста
const getPhotoData = function () {
  let photoData = [];
  for (let i = 1; i <= 25; i++) {
    let post = {
      id: i,
      url: 'photos/' + i + '.jpg',
      description: DESCRIPTIONS[i - 1],
      comments: getCommentData(),
      likes: getRandomIntInclusive(15, 200),
    };
    photoData.push(post);
  }
  return photoData;
};

getPhotoData();
