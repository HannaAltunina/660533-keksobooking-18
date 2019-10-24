'use strict';

(function () {
  var TRANSLATE_PROPERTIES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  var PROPERTY_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ENTER_KEYCODE = 13;
  var card = document.querySelector('#card').content.querySelector('.popup');

  function renderCard(proposition, i) {
    var cardElement = card.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = proposition.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = proposition.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = proposition.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.util.getConformity(proposition.offer.type, PROPERTY_TYPES, TRANSLATE_PROPERTIES);
    cardElement.querySelector('.popup__text--capacity').textContent = proposition.offer.rooms + ' комнаты для ' + proposition.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + proposition.offer.checkin + ', выезд до ' + proposition.offer.checkout;

    cardElement.querySelector('.popup__features').innerHTML = '';
    for (var j = 0; j < proposition.offer.features.length; j++) {
      var cardFeature = document.createElement('li');
      cardFeature.classList.add('popup__feature');
      cardFeature.classList.add('popup__feature--' + proposition.offer.features[j]);
      cardFeature.textContent = proposition.offer.features[j];
      cardElement.querySelector('.popup__features').appendChild(cardFeature);
    }

    cardElement.querySelector('.popup__description').textContent = proposition.offer.description;

    cardElement.querySelector('.popup__photos').innerHTML = '';
    for (var k = 0; k < proposition.offer.photos.length; k++) {
      var cardImage = document.createElement('img');
      cardImage.classList.add('popup__photo');
      cardImage.src = proposition.offer.photos[k];
      cardImage.width = 45;
      cardImage.height = 45;
      cardElement.querySelector('.popup__photos').appendChild(cardImage);
    }
    cardElement.querySelector('.popup__avatar').src = proposition.author.avatar;
    cardElement.setAttribute('rel', i);
    cardElement.classList.add('hidden');

    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      cardElement.classList.add('hidden');
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        cardElement.classList.add('hidden');
      }
    });

    return cardElement;
  }

  function renderCards(propositions) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.pin.MAX_USER_NUMBER; i++) {
      fragment.appendChild(renderCard(propositions[i], i));
    }
    return fragment;
  }

  function openCard() {
    var relValue = document.activeElement.getAttribute('rel');
    var cards = document.querySelectorAll('.map__card');
    for (var i = 0; i < cards.length; i++) {
      var cardElement = cards[i];
      cardElement.classList.add('hidden');
      if (cardElement.getAttribute('rel') === relValue) {
        cardElement.classList.remove('hidden');
      }
    }
  }

  function onPinEnterPress(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openCard();
    }
  }

  window.card = {
    PROPERTY_TYPES: PROPERTY_TYPES,
    TRANSLATE_PROPERTIES: TRANSLATE_PROPERTIES,
    card: card,
    renderCards: renderCards,
    openCard: openCard,
    onPinEnterPress: onPinEnterPress
  };
})();
