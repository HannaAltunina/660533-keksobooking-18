'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 132;
  var similarListElement = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var mapFiltres = document.querySelector('.map__filters');
  var formInputs = adForm.querySelectorAll('input');
  var formSelects = adForm.querySelectorAll('select');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var addressInput = document.querySelector('#address');

  window.PIN_WIDTH = 40;
  window.PIN_HEIGHT = 132;
  window.similarListElement = document.querySelector('.map__pins');
  window.adForm = document.querySelector('.ad-form');
  window.mapFiltres = document.querySelector('.map__filters');
  window.formInputs = adForm.querySelectorAll('input');
  window.formSelects = adForm.querySelectorAll('select');
  window.formFieldsets = adForm.querySelectorAll('fieldset');
  window.addressInput = document.querySelector('#address');


  window.main = {
    setupDisabled: function (inputs) {
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].setAttribute('disabled', 'disabled');
      }
    },

    disabledDeletion: function (inputs) {
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].removeAttribute('disabled');
      }
    },

    pageDeactivation: function () {
      window.main.setupDisabled(formInputs);
      window.main.setupDisabled(formSelects);
      window.main.setupDisabled(formFieldsets);
      mapFiltres.classList.add('ad-form--disabled');
    },

    pageActivation: function () {
      similarListElement.appendChild(window.pin.renderPins());
      window.map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      mapFiltres.classList.remove('ad-form--disabled');
      window.main.disabledDeletion(formInputs);
      window.main.disabledDeletion(formSelects);
      window.main.disabledDeletion(formFieldsets);
      addressInput.value = window.data.getAddressCoordinate(PIN_WIDTH, PIN_HEIGHT);
    }
  };

  window.main.pageDeactivation();

  window.mainPin.addEventListener('mousedown', window.main.pageActivation);
  window.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      window.main.pageActivation();
    }
  });
})();
