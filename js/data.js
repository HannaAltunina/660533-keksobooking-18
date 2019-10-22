'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var main = document.querySelector('main');
  var error = document.querySelector('#error').content.querySelector('.error');
  var map = document.querySelector('.map');


  function onDataLoad(propositions) {
    var fragment = window.pin.renderPins(propositions);
    window.main.similarListElement.appendChild(fragment);
    var cards = window.card.renderCards(propositions);
    map.appendChild(cards);
  }

  function closeError() {
    document.querySelector('.error').classList.add('hidden');
  }

  function onErrorEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeError();
    }
  }

  function onAnyFieldClick(evt) {
    if (evt.target !== document.querySelector('.error__message')) {
      closeError();
    }
  }

  function renderError(element) {
    var errorElement = element.cloneNode(true);
    var fragment = document.createDocumentFragment();

    fragment.appendChild(errorElement);
    errorElement.querySelector('.error__button').addEventListener('click', closeError);
    document.addEventListener('click', onAnyFieldClick);
    document.addEventListener('keydown', onErrorEscPress);

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
  }

  window.data = {
    ESC_KEYCODE: ESC_KEYCODE,
    map: map,
    init: init
  };
})();
