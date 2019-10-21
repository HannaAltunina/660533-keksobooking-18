'use strict';

(function () {
  var MAX_USER_NUMBER = 8;
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');

  function renderPin(proposition, i) {
    var pinElement = pin.cloneNode(true);
    pinElement.style = 'left: ' + proposition.location.x + 'px; top: ' + proposition.location.y + 'px;';
    pinElement.querySelector('img').alt = proposition.offer.title;
    pinElement.querySelector('img').src = proposition.author.avatar;
    pinElement.setAttribute('rel', i);
    pinElement.addEventListener('click', window.card.openCard(pinElement));

    return pinElement;
  }

  function renderPins(propositions) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_USER_NUMBER; i++) {
      fragment.appendChild(renderPin(propositions[i], i));
    }
    return fragment;
  }

  window.pin = {
    MAX_USER_NUMBER: MAX_USER_NUMBER,
    pin: pin,
    renderPins: renderPins,
  };
})();
