'use strict';

(function () {
  var MIN_PRICES = ['10000', '1000', '5000', '0'];
  var roomSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var typeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');
  var submit = document.querySelector('.ad-form__submit');
  var reset = document.querySelector('.ad-form__reset');
  var filtresForm = document.querySelector('.map__filters');


  function checkRooms() {
    var roomsSelectedOption = roomSelect.options[roomSelect.selectedIndex].value;
    var capacitySelectedOption = capacitySelect.options[capacitySelect.selectedIndex].value;

    if (parseInt(capacitySelectedOption, 10) > parseInt(roomsSelectedOption, 10)) {
      capacitySelect.setCustomValidity('Количество гостей не должно превышать количество комнат');
    } else {
      capacitySelect.setCustomValidity('');
    }
  }

  function changePricePlaceholder() {
    var typeSelectedOption = typeSelect.options[typeSelect.selectedIndex].value;
    var priceComform = window.util.getConformity(typeSelectedOption, window.card.PROPERTY_TYPES, MIN_PRICES);

    priceInput.placeholder = 'от ' + priceComform;
  }

  function checkPropertyPrices() {
    var typeSelectedOption = typeSelect.options[typeSelect.selectedIndex].value;
    var priceConform = window.util.getConformity(typeSelectedOption, window.card.PROPERTY_TYPES, MIN_PRICES);
    var translateType = window.util.getConformity(typeSelectedOption, window.card.PROPERTY_TYPES, window.card.TRANSLATE_PROPERTIES);

    if (parseInt(priceInput.value, 10) < parseInt(priceConform, 10)) {
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
  typeSelect.addEventListener('change', changePricePlaceholder, checkPropertyPrices);

  submit.addEventListener('click', checkRooms, checkPropertyPrices);

  reset.addEventListener('click', function () {
    window.data.form.reset();
    filtresForm.reset();
    window.main.getPinOnMap();
    window.main.addressInput.value = '!';
  });

  window.data.form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(window.data.form), window.data.onSuccess, window.data.onError);
    evt.preventDefault();
  });

  window.form = {

  };
})();
