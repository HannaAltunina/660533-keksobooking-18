'use strict';

(function () {
  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 84;
  var PIN_FIRST_WIDTH = 156;
  var PIN_FIRST_HEIGHT = 78;
  var LOCATION_X_MIN = 0;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
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

  function setPinOnMap() {
    mainPin.style.left = '570px';
    mainPin.style.top = '375px';
  }

  function setActivationPinAddress() {
    addressInput.value = getAddressCoordinate(PIN_FIRST_WIDTH, PIN_FIRST_HEIGHT);
  }

  function setAddressInputValue() {
    addressInput.value = getAddressCoordinate(PIN_WIDTH, PIN_HEIGHT);
  }

  function pageDeactivation() {
    setupDisabled(formInputs);
    setupDisabled(formSelects);
    setupDisabled(formFieldsets);
    mapFiltres.classList.add('ad-form--disabled');
    setActivationPinAddress();
  }

  function pageActivation() {
    window.data.init();
    window.data.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFiltres.classList.remove('ad-form--disabled');
    disabledDeletion(formInputs);
    disabledDeletion(formSelects);
    disabledDeletion(formFieldsets);
    setAddressInputValue();
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

    function onMouseMove(moveEvt) {
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
        minX: LOCATION_X_MIN - (PIN_WIDTH / 2),
        maxX: window.data.map.offsetWidth - (PIN_WIDTH / 2),
        minY: LOCATION_Y_MIN - PIN_HEIGHT,
        maxY: LOCATION_Y_MAX - PIN_HEIGHT
      };

      if (mainPin.offsetLeft - shift.x >= bordersOfPinPosition.minX && mainPin.offsetLeft - shift.x <= bordersOfPinPosition.maxX) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      if (mainPin.offsetTop - shift.y >= bordersOfPinPosition.minY && mainPin.offsetTop - shift.y <= bordersOfPinPosition.maxY) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      setAddressInputValue();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }
      setAddressInputValue();
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    setAddressInputValue();
  });

  window.main = {
    mainPin: mainPin,
    adForm: adForm,
    similarListElement: similarListElement,
    setAddressInputValue: setAddressInputValue,
    getAddressCoordinate: getAddressCoordinate,
    setPinOnMap: setPinOnMap,
    addressInput: addressInput
  };
})();
