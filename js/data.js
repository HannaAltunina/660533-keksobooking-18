'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var main = document.querySelector('main');
  var error = document.querySelector('#error').content.querySelector('.error');
  var success = document.querySelector('#success').content.querySelector('.success');
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');


  function onDataLoad(propositions) {
    var fragment = window.pin.renderPins(propositions);
    window.main.similarListElement.appendChild(fragment);
    var cards = window.card.renderCards(propositions);
    map.appendChild(cards);
  }

  function closeError() {
    document.querySelector('.error').classList.add('hidden');
  }

  function closeSuccess() {
    document.querySelector('.success').classList.add('hidden');
  }

  function onErrorEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeError();
    }
  }

  function onSuccessEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSuccess();
    }
  }

  function onAnyErrorFieldClick(evt) {
    if (evt.target !== document.querySelector('.error__message')) {
      closeError();
    }
  }

  function onAnySuccessFieldClick(evt) {
    if (evt.target !== document.querySelector('.success__message')) {
      closeSuccess();
    }
  }


  function renderInfoMessage(element) {
    var messageElement = element.cloneNode(true);
    var fragment = document.createDocumentFragment();

    fragment.appendChild(messageElement);

    return fragment;
  }

  function onError() {
    var errorMessage = renderInfoMessage(error);
    errorMessage.querySelector('.error__button').addEventListener('click', closeError);
    document.addEventListener('click', onAnyErrorFieldClick);
    document.addEventListener('keydown', onErrorEscPress);

    if (document.querySelector('.error')) {
      return;
    } else {
      main.appendChild(errorMessage);
    }
  }

  function onSuccess() {
    var successMessage = renderInfoMessage(success);
    document.addEventListener('click', onAnySuccessFieldClick);
    document.addEventListener('keydown', onSuccessEscPress);
    main.appendChild(successMessage);
    form.reset();
  }

  function init() {
    window.backend.load(onDataLoad, onError);
  }

  window.data = {
    ESC_KEYCODE: ESC_KEYCODE,
    onError: onError,
    onSuccess: onSuccess,
    map: map,
    init: init,
    form: form
  };
})();
