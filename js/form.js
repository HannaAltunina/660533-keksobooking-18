'use strict';

(function () {
  var roomSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var typeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');
  var submit = document.querySelector('.ad-form__submit');

  window.roomSelect = roomSelect;
  window.capacitySelect = capacitySelect;
  window.typeSelect = typeSelect;
  window.priceInput = priceInput;
  window.timeinSelect = timeinSelect;
  window.timeoutSelect = timeoutSelect;
  window.submit = submit;

  window.form = {
    checkRooms: function () {
      var roomsSelectedOption = roomSelect.options[roomSelect.selectedIndex].value;
      var capacitySelectedOption = capacitySelect.options[capacitySelect.selectedIndex].value;

      if (capacitySelectedOption > roomsSelectedOption) {
        capacitySelect.setCustomValidity('Количество гостей не должно превышать количество комнат');
        capacitySelect.validity = false;
      } else {
        capacitySelect.setCustomValidity('');
      }
    },

    changePricePlaceholder: function () {
      var typeSelectedOption = typeSelect.options[typeSelect.selectedIndex].value;
      var priceComform = window.data.getConformity(typeSelectedOption, window.PROPERTY_TYPES, window.MIN_PRICES);

      priceInput.placeholder = 'от ' + priceComform;
    },

    checkPropertyPrices: function () {
      var typeSelectedOption = typeSelect.options[typeSelect.selectedIndex].value;
      var priceConform = window.data.getConformity(typeSelectedOption, window.PROPERTY_TYPES, window.MIN_PRICES);
      var translateType = window.data.getConformity(typeSelectedOption, window.PROPERTY_TYPES, window.TRANSLATE_PROPERTIES);

      if (priceInput.value < priceConform) {
        priceInput.setCustomValidity('Минимальная стоимость проживания за ночь ' + priceConform + ' в объекте ' + translateType);
      } else {
        priceInput.setCustomValidity('');
      }
    },

    getConformTime: function (timeSelect1, timeSelect2) {
      return function () {
        timeSelect1.value = timeSelect2.value;
      };
    }
  };

  var getConformTimeOut = window.form.getConformTime(timeoutSelect, timeinSelect);
  var getConformTimeIn = window.form.getConformTime(timeinSelect, timeoutSelect);

  timeinSelect.addEventListener('change', getConformTimeOut);
  timeoutSelect.addEventListener('change', getConformTimeIn);

  capacitySelect.addEventListener('change', window.form.checkRooms);
  roomSelect.addEventListener('change', window.form.checkRooms);
  priceInput.addEventListener('change', window.form.checkPropertyPrices);
  typeSelect.addEventListener('change', window.form.changePricePlaceholder);

  submit.addEventListener('click', window.form.checkRooms, window.form.checkPropertyPrices);

})();
