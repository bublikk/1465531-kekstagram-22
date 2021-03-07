const HASHTAG_LENGTH_MIN = 2;
const HASHTAG_LENGTH_MAX = 20;
const HASHTAG_COUNT_LIMIT = 5;
const HASHTAG_UNIQUE_LIMIT = 1;

const hashtagInput = document.querySelector('.text__hashtags');

// Валидация хеш-тегов
hashtagInput.addEventListener('input', () => {
  hashtagInput.setCustomValidity('');

  // trim убирает пробелы по краям строки, split рубит строку на коллецию по указанному разделителю
  let hashtags = hashtagInput.value.trim().split(' ');

  // Если поле ввода хеш-тега пустое, trim().split(' ') возвращает массив состоящий из пустого элемента,
  // код ниже переопределяет массив в пустой, чтобы поле оставалось валидным
  if (hashtagInput.value.length === 0){
    hashtags = [];
  }

  for (let i = 0; i < hashtags.length; i++) {
    hashtags[i] = hashtags[i].toLowerCase();
  }

  if (hashtags.length > HASHTAG_COUNT_LIMIT) {
    hashtagInput.setCustomValidity ('Нельзя указать больше пяти хэш-тегов');
  } else {
    for (let hashtag of hashtags) {
      if (hashtag.length < HASHTAG_LENGTH_MIN) {
        hashtagInput.setCustomValidity ('Имя должно состоять минимум из 2-х символов');
      } else if (hashtag.length > HASHTAG_LENGTH_MAX) {
        hashtagInput.setCustomValidity ('Имя не должно превышать 20-ти символов');
      } else if (hashtag[0] !== '#') {
        hashtagInput.setCustomValidity ('Хеш-тег начинается с "#"');
      } else if (hashtag.substring(1).match('^[а-яa-z0-9]+$') === null){
        hashtagInput.setCustomValidity ('Не может содержать пробелы, спецсимволы');
      } else if (hashtags.filter((x) => {return x === hashtag}).length > HASHTAG_UNIQUE_LIMIT) {
        hashtagInput.setCustomValidity ('Нельзя использовать одинаковые хэш-теги');
      }
    }
  }

  hashtagInput.reportValidity();
});
