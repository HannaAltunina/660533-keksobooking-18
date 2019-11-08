'use strict';

(function () {
  var PINS_MAX_NUMBER = 5;
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');

  function renderPin(proposition, i) {
    var pinElement = pin.cloneNode(true);
    pinElement.style = 'left: ' + proposition.location.x + 'px; top: ' + proposition.location.y + 'px;';
    pinElement.querySelector('img').alt = proposition.offer.title;
    pinElement.querySelector('img').src = proposition.author.avatar;
    pinElement.setAttribute('rel', i);
    pinElement.addEventListener('click', window.card.openCard);
    pinElement.addEventListener('keydown', window.card.onPinEnterPress);

    return pinElement;
  }

  function renderPins(propositions) {
    var pinsNumber = propositions.length > PINS_MAX_NUMBER ? PINS_MAX_NUMBER : propositions.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinsNumber; i++) {
      fragment.appendChild(renderPin(propositions[i], i));
    }
    return fragment;
  }

  function pinActivation() {
    var mapPins = document.querySelectorAll('.map__pin');
    mapPins.forEach(function (mapPin) {
      mapPin.classList.remove('map__pin--active');
    });
    document.activeElement.classList.add('map__pin--active');
  }

  function pinDeactivation() {
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (it) {
      it.classList.remove('map__pin--active');
    });
  }

  function deleteRenderedPins() {
    var renderedPins = document.querySelectorAll('.map__pin');
    renderedPins.forEach(function (renderedPin) {
      if (renderedPin !== window.main.mainPin) {
        window.main.similarListElement.removeChild(renderedPin);
      }
    });
  }

  window.pin = {
    renderPins: renderPins,
    pinActivation: pinActivation,
    pinDeactivation: pinDeactivation,
    deleteRenderedPins: deleteRenderedPins
  };
})();
