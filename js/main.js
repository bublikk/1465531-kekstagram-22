// возвращает случайное целое число от min (вкл) до max (вкл)
// диапазон только положительный (вкл 0)
// если значение max <= min, то вернет -1

const getRandomIntInclusive = (min, max) => {
  min = Math.floor(min);
  max = Math.floor(max);
  return min >= 0 && max > min ? Math.floor(Math.random() * (max - min + 1)) + min : -1;
}

getRandomIntInclusive(1.5,20);

//проверка максимальной длины строки

const checkStringLength = (initialString, maxLength) => {
  return initialString.length <= maxLength;
}

checkStringLength('', 10);
