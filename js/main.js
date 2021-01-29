// возвращает случайное целое число от min (вкл) до max (вкл)
// диапазон только положительный (вкл 0)
// если значение max <= min, то вернет -1

const randomInteger = function (min, max) {
  if (min >= 0 && max > min) {
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }
  return -1;
}

randomInteger(1,400);

//проверка максимальной длины строки

const сheckStringLength  = function (initialString, maxLength) {
  if (initialString !== '' && initialString.length <= maxLength) {
    return true;
  }
  return false;
}

сheckStringLength('Статическое свойство string.length возвращает значение.', 100);
