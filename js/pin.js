'use strict';

(function () {
  var PIN_TITLE = 'Заголовок';
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var propositions = window.data.getPropositions(window.MAX_USER_NUMBER);

  window.PIN_TITLE = PIN_TITLE;
  window.pin = pin;
  window.propositions = propositions;

  window.pin = {
    renderPin: function (proposition) {
      var pinElement = pin.cloneNode(true);
      pinElement.style = 'left: ' + proposition.location.x + 'px; top: ' + proposition.location.y + 'px;';
      pinElement.alt = PIN_TITLE;
      pinElement.querySelector('img').src = proposition.author.avatar;

      return pinElement;
    },

    renderPins: function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < propositions.length; i++) {
        fragment.appendChild(window.pin.renderPin(propositions[i]));
      }
      return fragment;
    }
  };
})();
