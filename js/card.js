'use strict';

(function () {
  var card = document.querySelector('#card').content.querySelector('.popup');
  var map = document.querySelector('.map');

  window.card = card;
  window.map = map;

  window.card = {
    renderCard: function (proposition) {
      var cardElement = card.cloneNode(true);

      cardElement.querySelector('.popup__title').textContent = proposition.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = proposition.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = proposition.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = window.data.getConformity(proposition.offer.type, window.PROPERTY_TYPES, window.TRANSLATE_PROPERTIES);
      cardElement.querySelector('.popup__text--capacity').textContent = proposition.offer.rooms + ' комнаты для ' + proposition.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + proposition.offer.checkin + ', выезд до ' + proposition.offer.checkout;
      cardElement.querySelector('.popup__features').textContent = proposition.offer.features;
      cardElement.querySelector('.popup__description').textContent = proposition.offer.description;
      cardElement.querySelector('.popup__photos').src = proposition.offer.photos;
      cardElement.querySelector('.popup__avatar').src = proposition.author.avatar;
      return cardElement;
    },

    openPropositionCard: function () {
      map.appendChild(window.card.renderCard());
    }
  };

  window.pin.addEventListener('click', window.card.openPropositionCard);
})();
