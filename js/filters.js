'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');

  var housingValue;

  function updatePins() {
    window.card.closeCards();
    window.pin.deleteRenderedPins();
    var sameHousingPins = window.data.getPins().filter(function (it) {
      if (housingValue === 'any') {
        return it;
      } else {
        return it.offer.type === housingValue;
      }
    });
    var fragment = window.pin.renderPins(sameHousingPins);
    window.main.similarListElement.appendChild(fragment);
    var cards = window.card.renderCards(sameHousingPins);
    window.data.map.appendChild(cards);
  }

  housingType.addEventListener('change', function () {
    var housing = housingType.options[housingType.selectedIndex].value;
    housingValue = housing;
    updatePins();
  });

  window.filtres = {
    updatePins: updatePins
  };

})();
