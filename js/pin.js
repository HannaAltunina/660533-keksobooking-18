'use strict';

(function () {
  var MAX_USER_NUMBER = 8;
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var main = document.querySelector('main');
  var error = document.querySelector('#error').content.querySelector('.error');
  var ESC_KEYCODE = 27;

  function renderPin(proposition, i) {
    var pinElement = pin.cloneNode(true);
    pinElement.style = 'left: ' + proposition.location.x + 'px; top: ' + proposition.location.y + 'px;';
    pinElement.querySelector('img').alt = proposition.offer.title;
    pinElement.querySelector('img').src = proposition.author.avatar;
    pinElement.setAttribute('rel', i);
    return pinElement;
  }

  function renderPins(propositions) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_USER_NUMBER; i++) {
      fragment.appendChild(renderPin(propositions[i], i));
    }
    return fragment;
  }

  function onDataLoad(propositions) {
    var fragment = renderPins(propositions);
    window.main.similarListElement.appendChild(fragment);
    var cards = window.card.renderCards(propositions);
    map.appendChild(cards);
  }

  function closePopup() {
    document.querySelector('.error').classList.add('hidden');
  }

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var onAnyFieldClick = function (evt) {
    if (evt.target !== document.querySelector('.error__message')) {
      closePopup();
    }
  };

  function renderError(element) {
    var errorElement = element.cloneNode(true);
    var fragment = document.createDocumentFragment();

    fragment.appendChild(errorElement);
    errorElement.querySelector('.error__button').addEventListener('click', closePopup);

    return fragment;
  }

  function onError() {
    var errorMessage = renderError(error);
    if (document.querySelector('.error')) {
      return;
    } else {
      main.appendChild(errorMessage);
    }
  }

  function init() {
    window.backend.load(onDataLoad, onError);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', onAnyFieldClick);
  }


  window.pin = {
    MAX_USER_NUMBER: MAX_USER_NUMBER,
    pin: pin,
    map: map,
    renderPin: renderPin,
    init: init
  };
})();
