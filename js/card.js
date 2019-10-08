'use strict';

(function () {
  var TRANSLATE_PROPERTIES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  var card = document.querySelector('#card').content.querySelector('.popup');
  var map = document.querySelector('.map');

  function renderCard(proposition) {
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

    return cardElement;
  }

  function openPropositionCard() {
    map.appendChild(renderCard());
  }

  window.card = {
    card: card,
    map: map,
    renderCard: renderCard,
    openPropositionCard: openPropositionCard,
    TRANSLATE_PROPERTIES: TRANSLATE_PROPERTIES
  };
})();
