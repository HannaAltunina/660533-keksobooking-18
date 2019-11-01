'use strict';

(function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

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
    } else {
      return it.offer.type === housingValue;
    }
  }

  function getSamePricedPins(it) {
    var priceValue = housingPrice.options[housingPrice.selectedIndex].value;

    switch (priceValue) {
      case 'low':
        return it.offer.price < LOW_PRICE;
      case 'middle':
        return it.offer.price >= LOW_PRICE && it.offer.price < HIGH_PRICE;
      case 'high':
        return it.offer.price >= HIGH_PRICE;
      default:
        return it;
    }
  }

  function getSameRoomsPins(it) {
    var roomsValue = housingRooms.options[housingRooms.selectedIndex].value;

    if (roomsValue === 'any') {
      return it;
    } else {
      return it.offer.rooms === parseInt(roomsValue, 10);
    }
  }

  function getSameGuestsPins(it) {
    var guestsValue = housingGuests.options[housingGuests.selectedIndex].value;

    if (guestsValue === 'any') {
      return it;
    } else {
      return it.offer.guests === parseInt(guestsValue, 10);
    }
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
