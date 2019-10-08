'use strict';

(function () {
  var MIN_ARRAY_LENGTH = 1;

  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getRandomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  function getConformity(element, arr1, arr2) {
    var conformity = '';
    for (var i = 0; i < arr1.length; i++) {
      if (element === arr1[i]) {
        conformity = arr2[i];
      }
    }
    return conformity;
  }

  function getRandomLengthArray(arr) {
    var length = getRandomNumber(MIN_ARRAY_LENGTH, arr.length);
    var newArr = [];
    for (var i = 0; i < length; i++) {
      newArr[i] = getRandomElement(arr);
    }
    return newArr;
  }

  window.util = {
    getRandomElement: getRandomElement,
    getRandomNumber: getRandomNumber,
    getConformity: getConformity,
    getRandomLengthArray: getRandomLengthArray
  };
})();

