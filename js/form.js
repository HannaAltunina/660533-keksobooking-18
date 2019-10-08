'use strict';

(function () {
  var roomSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var typeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');
  var submit = document.querySelector('.ad-form__submit');
  var MIN_PRICES = ['10000', '1000', '5000', '0'];

  function checkRooms() {
    var roomsSelectedOption = roomSelect.options[roomSelect.selectedIndex].value;
    var capacitySelectedOption = capacitySelect.options[capacitySelect.selectedIndex].value;

    if (capacitySelectedOption > roomsSelectedOption) {
      capacitySelect.setCustomValidity('Количество гостей не должно превышать количество комнат');
    } else {
      capacitySelect.setCustomValidity('');
    }
  }

  function changePricePlaceholder() {
    var typeSelectedOption = typeSelect.options[typeSelect.selectedIndex].value;
    var priceComform = window.util.getConformity(typeSelectedOption, window.data.PROPERTY_TYPES, MIN_PRICES);

    priceInput.placeholder = 'от ' + priceComform;
  }

  function checkPropertyPrices() {
    var typeSelectedOption = typeSelect.options[typeSelect.selectedIndex].value;
    var priceConform = window.util.getConformity(typeSelectedOption, window.data.PROPERTY_TYPES, MIN_PRICES);
    var translateType = window.util.getConformity(typeSelectedOption, window.data.PROPERTY_TYPES, window.card.TRANSLATE_PROPERTIES);

    if (priceInput.value < priceConform) {
      priceInput.setCustomValidity('Минимальная стоимость проживания за ночь ' + priceConform + ' в объекте ' + translateType);
    } else {
      priceInput.setCustomValidity('');
    }
  }

  function getConformTime(timeSelect1, timeSelect2) {
    return function () {
      timeSelect1.value = timeSelect2.value;
    };
  }

  var getConformTimeOut = getConformTime(timeoutSelect, timeinSelect);
  var getConformTimeIn = getConformTime(timeinSelect, timeoutSelect);

  timeinSelect.addEventListener('change', getConformTimeOut);
  timeoutSelect.addEventListener('change', getConformTimeIn);

  capacitySelect.addEventListener('change', checkRooms);
  roomSelect.addEventListener('change', checkRooms);
  priceInput.addEventListener('change', checkPropertyPrices);
  typeSelect.addEventListener('change', changePricePlaceholder);

  submit.addEventListener('click', checkRooms, checkPropertyPrices);
})();
