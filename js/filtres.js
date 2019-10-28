'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');

  var housingValue;

  var updatePins = function () {
    var sameHousingPins = window.data.pins.filter(function (it) {
      return it.offer.type === housingValue;
    });
    window.pin.renderPins(sameHousingPins);
  };

  housingType.addEventListener('change', function () {
    var housing = housingType.options[housingType.selectedIndex].value;
    housingValue = housing;
    updatePins();
  });

  window.filtres = {
    updatePins: updatePins
  };

})();
