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

  function closePopup() {
    document.querySelector('.error').classList.add('hidden');
  }

  function onPopupEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  }

  function onAnyFieldClick(evt) {
    if (evt.target !== document.querySelector('.error__message')) {
      closePopup();
    }
  }

  function renderError(element) {
    var errorElement = element.cloneNode(true);
    var fragment = document.createDocumentFragment();

    fragment.appendChild(errorElement);
    errorElement.querySelector('.error__button').addEventListener('click', closePopup);
    document.addEventListener('click', onAnyFieldClick);
    document.addEventListener('keydown', onPopupEscPress);

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
    map: map,
    init: init
  };
})();
