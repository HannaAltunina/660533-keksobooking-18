'use strict';

(function () {
  function getConformity(element, arr1, arr2) {
    var conformity = '';
    for (var i = 0; i < arr1.length; i++) {
      if (element === arr1[i]) {
        conformity = arr2[i];
      }
    }
    return conformity;
  }

  function getAddressCoordinate(element, width, height) {
    return (parseInt(element.style.left, 10) + width / 2) + ', ' + (parseInt(element.style.top, 10) + height);
  }

  function disableElements(elements) {
    elements.forEach(function (element) {
      element.setAttribute('disabled', 'disabled');
    });
  }

  function activateElements(elements) {
    elements.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  }

  window.util = {
    getConformity: getConformity,
    disableElements: disableElements,
    activateElements: activateElements,
    getAddressCoordinate: getAddressCoordinate
  };
})();

