'use strict';

(function () {
  var PINS_COUNT = 5;
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
    var pinsNumber = propositions.length > PINS_COUNT ? PINS_COUNT : propositions.length;
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

  window.pin = {
    pin: pin,
    renderPins: renderPins,
    pinActivation: pinActivation
  };
})();
