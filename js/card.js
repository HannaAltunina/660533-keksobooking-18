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
    proposition.offer.features.forEach(function (feature) {
      var cardFeature = document.createElement('li');
      cardFeature.classList.add('popup__feature');
      cardFeature.classList.add('popup__feature--' + feature);
      cardFeature.textContent = proposition.offer.feature;
      cardElement.querySelector('.popup__features').appendChild(cardFeature);
    });

    cardElement.querySelector('.popup__description').textContent = proposition.offer.description;

    cardElement.querySelector('.popup__photos').innerHTML = '';
    proposition.offer.photos.forEach(function (photo) {
      var cardImage = document.createElement('img');
      cardImage.classList.add('popup__photo');
      cardImage.src = photo;
      cardImage.width = 45;
      cardImage.height = 45;
      cardElement.querySelector('.popup__photos').appendChild(cardImage);
    });

    cardElement.querySelector('.popup__avatar').src = proposition.author.avatar;
    cardElement.setAttribute('rel', i);
    cardElement.classList.add('hidden');

    function closeCard() {
      cardElement.classList.add('hidden');
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
      document.removeEventListener('keydown', onCardEscPress);
    }

    function onCardEscPress(evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        closeCard();
      }
    }

    cardElement.querySelector('.popup__close').addEventListener('click', closeCard);

    document.addEventListener('keydown', onCardEscPress);

    return cardElement;
  }

  function renderCards(propositions) {
    var fragment = document.createDocumentFragment();
    propositions.forEach(function (proposition, i) {
      fragment.appendChild(renderCard(proposition, i));
    });
    return fragment;
  }

  function openCard() {
    window.pin.pinActivation();
    var relValue = document.activeElement.getAttribute('rel');
    var cards = document.querySelectorAll('.map__card');
    cards.forEach(function (cardElement) {
      cardElement.classList.add('hidden');
      if (cardElement.getAttribute('rel') === relValue) {
        cardElement.classList.remove('hidden');
      }
    });
  }

  function onPinEnterPress(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openCard();
    }
  }

  function closeCards() {
    var cards = document.querySelectorAll('.map__card');
    cards.forEach(function (it) {
      it.classList.add('hidden');
    });
  }

  function deleteRenderedCards() {
    var renderedCards = document.querySelectorAll('.map__card');
    renderedCards.forEach(function (renderedCard) {
      window.data.map.removeChild(renderedCard);
    });
  }

  window.card = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    PROPERTY_TYPES: PROPERTY_TYPES,
    TRANSLATE_PROPERTIES: TRANSLATE_PROPERTIES,
    card: card,
    renderCards: renderCards,
    openCard: openCard,
    closeCards: closeCards,
    onPinEnterPress: onPinEnterPress,
    deleteRenderedCards: deleteRenderedCards
  };
})();
