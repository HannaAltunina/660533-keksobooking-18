'use strict';

(function () {
  var MAX_USER_NUMBER = 8;
  var MIN_ARRAY_LENGTH = 1;
  var OFFER_ADDRESS = '600, 350';
  var MIN_PRICE = 0;
  var MAX_PRICE = 1000000;
  var PROPERTY_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TRANSLATE_PROPERTIES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  var MIN_PRICES = ['10000', '1000', '5000', '0'];
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 100;
  var CHECKIN_DATES = ['12:00', '13:00', '14:00'];
  var CHECKOUT_DATES = ['12:00', '13:00', '14:00'];
  var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var LOCATION_X_MIN = 0;
  var BODY_WIDTH = 1200;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var widthContentArea = document.documentElement.clientWidth;
  var mainPin = document.querySelector('.map__pin--main');

  window.MAX_USER_NUMBER = MAX_USER_NUMBER;
  window.MIN_ARRAY_LENGTH = MIN_ARRAY_LENGTH;
  window.OFFER_ADDRESS = OFFER_ADDRESS;
  window.MIN_PRICE = MIN_PRICE;
  window.MAX_PRICE = MAX_PRICE;
  window.PROPERTY_TYPES = PROPERTY_TYPES;
  window.TRANSLATE_PROPERTIES = TRANSLATE_PROPERTIES;
  window.MIN_PRICES = MIN_PRICES;
  window.MIN_ROOMS = MIN_ROOMS;
  window.MAX_ROOMS = MAX_ROOMS;
  window.CHECKIN_DATES = CHECKIN_DATES;
  window.CHECKOUT_DATES = CHECKOUT_DATES;
  window.FEATURES_LIST = FEATURES_LIST;
  window.PHOTOS = PHOTOS;
  window.LOCATION_X_MIN = LOCATION_X_MIN;
  window.BODY_WIDTH = BODY_WIDTH;
  window.LOCATION_Y_MIN = LOCATION_Y_MIN;
  window.LOCATION_Y_MAX = LOCATION_Y_MAX;
  window.widthContentArea = document.documentElement.clientWidth;
  window.mainPin = mainPin;

  window.data = {
    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    locationXMax: function () {
      return (widthContentArea < BODY_WIDTH) ? widthContentArea : BODY_WIDTH;
    },

    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max - min + 1));
    },

    getRandomLengthArray: function (arr) {
      var length = window.data.getRandomNumber(MIN_ARRAY_LENGTH, arr.length);
      var newArr = [];
      for (var i = 0; i < length; i++) {
        newArr[i] = window.data.getRandomElement(arr);
      }
      return newArr;
    },

    getGuestsNumber: function (rooms) {
      return (rooms === 1) ? ('для ' + rooms + ' гостя') : ('для ' + rooms + ' гостей');
    },

    getAddressCoordinate: function (width, height) {
      return (parseInt(mainPin.style.left, 10) + width / 2) + ', ' + (parseInt(mainPin.style.top, 10) + height);
    },

    getConformity: function (element, arr1, arr2) {
      var conformity = '';
      for (var i = 0; i < arr1.length; i++) {
        if (element === arr1[i]) {
          conformity = arr2[i];
        }
      }
      return conformity;
    },

    generateProposition: function (j) {
      var proposition = {
        author: {
          avatar: 'img/avatars/user0' + (j + 1) + '.png'
        },
        offer: {
          title: window.data.PIN_TITLE + ' ' + (j + 1),
          address: OFFER_ADDRESS,
          price: window.data.getRandomNumber(MIN_PRICE, MAX_PRICE),
          type: window.data.getRandomElement(PROPERTY_TYPES),
          rooms: window.data.getRandomNumber(MIN_ROOMS, MAX_ROOMS),
          guests: window.data.getGuestsNumber(window.data.getRandomNumber(MIN_ROOMS, MAX_ROOMS)),
          checkin: window.data.getRandomElement(CHECKIN_DATES),
          checkout: window.data.getRandomElement(CHECKOUT_DATES),
          features: window.data.getRandomLengthArray(FEATURES_LIST),
          description: '',
          photos: window.data.getRandomLengthArray(PHOTOS)
        },
        location: {
          x: window.data.getRandomNumber(LOCATION_X_MIN, window.data.locationXMax()),
          y: window.data.getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
        }
      };
      return proposition;
    },

    getPropositions: function (length) {
      var propositions = [];
      for (var j = 0; j < length; j++) {
        propositions[j] = window.data.generateProposition(j);
      }
      return propositions;
    }
  };
})();
