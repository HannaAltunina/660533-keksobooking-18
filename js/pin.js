'use strict';

(function () {
  var MAX_USER_NUMBER = 8;
  var PIN_TITLE = 'Заголовок';
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');

  function renderPin(proposition) {
    var pinElement = pin.cloneNode(true);
    pinElement.style = 'left: ' + proposition.location.x + 'px; top: ' + proposition.location.y + 'px;';
    pinElement.alt = PIN_TITLE;
    pinElement.querySelector('img').src = proposition.author.avatar;

    return pinElement;
  }

  window.backend.load(function (propositions) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_USER_NUMBER; i++) {
      fragment.appendChild(renderPin(propositions[i]));
    }
    return fragment;
  });

  window.pin = {
    pin: pin,
    // propositions: propositions,
    renderPin: renderPin,
    renderPins: window.backend.load
  };
})();
