'use strict';

(function () {
  var TRANSLATE_PROPERTIES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  var card = document.querySelector('#card').content.querySelector('.popup');

  function renderCard(proposition, i) {
    var cardElement = card.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = proposition.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = proposition.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = proposition.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.util.getConformity(proposition.offer.type, window.data.PROPERTY_TYPES, TRANSLATE_PROPERTIES);
    cardElement.querySelector('.popup__text--capacity').textContent = proposition.offer.rooms + ' комнаты для ' + proposition.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + proposition.offer.checkin + ', выезд до ' + proposition.offer.checkout;
    cardElement.querySelector('.popup__features').textContent = proposition.offer.features;
    cardElement.querySelector('.popup__description').textContent = proposition.offer.description;
    cardElement.querySelector('.popup__photos').src = proposition.offer.photos;
    cardElement.querySelector('.popup__avatar').src = proposition.author.avatar;
    cardElement.setAttribute('rel', i);
    cardElement.classList.add('hidden');

    return cardElement;
  }

  function renderCards(propositions) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.pin.MAX_USER_NUMBER; i++) {
      fragment.appendChild(renderCard(propositions[i], i));
    }
    return fragment;
  }

  // function openCard(pinElement) {
  //   var cardElement = window.pin.getPropositionCard(pinElement);
  //   cardElement.classList.remove('hidden');
  // }

  window.card = {
    card: card,
    // openCard: openCard,
    renderCards: renderCards,
    TRANSLATE_PROPERTIES: TRANSLATE_PROPERTIES
  };
})();
