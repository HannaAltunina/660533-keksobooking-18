'use strict';

(function () {
  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 84;
  var PIN_FIRST_WIDTH = 156;
  var PIN_FIRST_HEIGHT = 78;
  var similarListElement = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var mapFiltres = document.querySelector('.map__filters');
  var formInputs = adForm.querySelectorAll('input');
  var formSelects = adForm.querySelectorAll('select');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var addressInput = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');

  function getAddressCoordinate(width, height) {
    return (parseInt(mainPin.style.left, 10) + width / 2) + ', ' + (parseInt(mainPin.style.top, 10) + height);
  }

  function setupDisabled(inputs) {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].setAttribute('disabled', 'disabled');
    }
  }

  function disabledDeletion(inputs) {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].removeAttribute('disabled');
    }
  }

  function pageDeactivation() {
    setupDisabled(formInputs);
    setupDisabled(formSelects);
    setupDisabled(formFieldsets);
    mapFiltres.classList.add('ad-form--disabled');
    addressInput.value = getAddressCoordinate(PIN_FIRST_WIDTH, PIN_FIRST_HEIGHT);
  }

  function pageActivation() {
    window.pin.init();
    window.pin.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFiltres.classList.remove('ad-form--disabled');
    disabledDeletion(formInputs);
    disabledDeletion(formSelects);
    disabledDeletion(formFieldsets);
    addressInput.value = getAddressCoordinate(PIN_WIDTH, PIN_HEIGHT);
  }

  pageDeactivation();

  mainPin.addEventListener('click', pageActivation);
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      pageActivation();
    }
  });

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };


      var bordersOfPinPosition = {
        minX: window.data.LOCATION_X_MIN - (PIN_WIDTH / 2),
        maxX: window.pin.map.offsetWidth - (PIN_WIDTH / 2),
        minY: window.data.LOCATION_Y_MIN - PIN_HEIGHT,
        maxY: window.data.LOCATION_Y_MAX - PIN_HEIGHT
      };

      if (mainPin.offsetLeft - shift.x >= bordersOfPinPosition.minX && mainPin.offsetLeft - shift.x <= bordersOfPinPosition.maxX) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      if (mainPin.offsetTop - shift.y >= bordersOfPinPosition.minY && mainPin.offsetTop - shift.y <= bordersOfPinPosition.maxY) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      getAddressCoordinate();

      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pin.pin.addEventListener('click', window.card.openPropositionCard);

  window.main = {
    mainPin: mainPin,
    adForm: adForm,
    similarListElement: similarListElement
  };
})();
