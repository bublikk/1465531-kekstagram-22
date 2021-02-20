// Проверка максимальной длины строки
const checkStringLength = function (initialString, maxLength) {
  return initialString.length <= maxLength;
}

checkStringLength('', 10);

// Возвращает случайное целое число от min (вкл) до max (вкл)
// Диапазон только положительный (вкл 0)
// Если значение max <= min, то вернет -1
const getRandomIntInclusive = function (min, max) {
  min = Math.floor(min);
  max = Math.floor(max);
  return min >= 0 && max > min
    ? Math.floor(Math.random() * (max - min + 1)) + min
    : -1;
};

export {checkStringLength, getRandomIntInclusive};
