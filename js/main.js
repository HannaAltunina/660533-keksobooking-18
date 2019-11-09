'use strict';

(function () {
  var Location = {
    X_MIN: 0,
    Y_MIN: 130,
    Y_MAX: 630
  };

  var MainPinStyle = {
    LEFT: '570px',
    TOP: '375px'
  };

  var PinSize = {
    FIRST_WIDTH: 156,
    FIRST_HEIGHT: 78,
    WIDTH: 62,
    HEIGHT: 84
  };

  var similarListElement = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var mapFiltres = document.querySelector('.map__filters');
  var formInputs = adForm.querySelectorAll('input');
  var formSelects = adForm.querySelectorAll('select');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var addressInput = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');

  function setPinOnMap() {
    mainPin.style.left = MainPinStyle.LEFT;
    mainPin.style.top = MainPinStyle.TOP;
  }

  function setActivationPinAddress() {
    addressInput.value = window.util.getAddressCoordinate(mainPin, PinSize.FIRST_WIDTH, PinSize.FIRST_HEIGHT);
  }

  function setAddressInputValue() {
    addressInput.value = window.util.getAddressCoordinate(mainPin, PinSize.WIDTH, PinSize.HEIGHT);
  }

  function pageDeactivation() {
    window.util.disableElements(formInputs);
    window.util.disableElements(formSelects);
    window.util.disableElements(formFieldsets);
    mapFiltres.classList.add('ad-form--disabled');
    setActivationPinAddress();
  }

  function pageActivation() {
    window.data.init();
    window.data.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFiltres.classList.remove('ad-form--disabled');
    window.util.activateElements(formInputs);
    window.util.activateElements(formSelects);
    window.util.activateElements(formFieldsets);
    setAddressInputValue();
  }

  pageDeactivation();

  mainPin.addEventListener('click', pageActivation);

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.card.ENTER_KEYCODE) {
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
        minX: Location.X_MIN - (PinSize.WIDTH / 2),
        maxX: window.data.map.offsetWidth - (PinSize.WIDTH / 2),
        minY: Location.Y_MIN - PinSize.HEIGHT,
        maxY: Location.Y_MAX - PinSize.HEIGHT
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
    setPinOnMap: setPinOnMap,
    addressInput: addressInput,
    pageDeactivation: pageDeactivation
  };
})();
