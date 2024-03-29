'use strict';

(function () {
  var Price = {
    LOW: 10000,
    HIGH: 50000
  };

  var PriceTypes = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var filterSelections = document.querySelector('.map__filters').querySelectorAll('select');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var featureCheckboxes = document.querySelector('#housing-features').querySelectorAll('input');

  function getSameHousingPins(it) {
    var housingValue = housingType.options[housingType.selectedIndex].value;
    if (housingValue === 'any') {
      return it;
    }

    return it.offer.type === housingValue;
  }

  function getSamePricedPins(it) {
    var priceValue = housingPrice.options[housingPrice.selectedIndex].value;

    switch (priceValue) {
      case PriceTypes.LOW:
        return it.offer.price < Price.LOW;
      case PriceTypes.MIDDLE:
        return it.offer.price >= Price.LOW && it.offer.price < Price.HIGH;
      case PriceTypes.HIGH:
        return it.offer.price >= Price.HIGH;
      default:
        return it;
    }
  }

  function getSameRoomsPins(it) {
    var roomsValue = housingRooms.options[housingRooms.selectedIndex].value;

    if (roomsValue === 'any') {
      return it;
    }

    return it.offer.rooms === parseInt(roomsValue, 10);
  }

  function getSameGuestsPins(it) {
    var guestsValue = housingGuests.options[housingGuests.selectedIndex].value;

    if (guestsValue === 'any') {
      return it;
    }

    return it.offer.guests === parseInt(guestsValue, 10);
  }

  function getSameFeaturesPins(it) {
    var features = [];

    featureCheckboxes.forEach(function (input) {
      if (input.checked) {
        features.push(input.value);
      }
    });

    return features.every(function (feature) {
      return it.offer.features.includes(feature);
    });
  }

  function getFilteredPins() {
    return window.data.getPins().filter(function (it) {
      return getSameHousingPins(it) && getSamePricedPins(it) && getSameRoomsPins(it) && getSameGuestsPins(it) && getSameFeaturesPins(it);
    });
  }

  function updatePins() {
    window.pin.deleteRenderedPins();
    window.card.deleteRenderedCards();
    getFilteredPins();

    var fragment = window.pin.renderPins(getFilteredPins());
    window.main.similarListElement.appendChild(fragment);
    var cards = window.card.renderCards(getFilteredPins());
    window.data.map.appendChild(cards);
  }

  function setDebounceUpdating() {
    window.debounce.debounce(updatePins());
  }

  filterSelections.forEach(function (filterSelect) {
    filterSelect.addEventListener('change', setDebounceUpdating);
  });

  featureCheckboxes.forEach(function (featureCheckbox) {
    featureCheckbox.addEventListener('change', setDebounceUpdating);
  });

  window.filtres = {
    updatePins: updatePins
  };

})();
