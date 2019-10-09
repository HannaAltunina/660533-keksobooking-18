'use strict';

(function () {
  var OFFER_ADDRESS = '600, 350';
  var MIN_PRICE = 0;
  var MAX_PRICE = 1000000;
  var PROPERTY_TYPES = ['palace', 'flat', 'house', 'bungalo'];
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

  function locationXMax() {
    return (widthContentArea < BODY_WIDTH) ? widthContentArea : BODY_WIDTH;
  }

  function getGuestsNumber(rooms) {
    return (rooms === 1) ? ('для ' + rooms + ' гостя') : ('для ' + rooms + ' гостей');
  }

  function generateProposition(j) {
    var proposition = {
      author: {
        avatar: 'img/avatars/user0' + (j + 1) + '.png'
      },
      offer: {
        title: window.data.PIN_TITLE + ' ' + (j + 1),
        address: OFFER_ADDRESS,
        price: window.util.getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: window.util.getRandomElement(PROPERTY_TYPES),
        rooms: window.util.getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        guests: getGuestsNumber(window.util.getRandomNumber(MIN_ROOMS, MAX_ROOMS)),
        checkin: window.util.getRandomElement(CHECKIN_DATES),
        checkout: window.util.getRandomElement(CHECKOUT_DATES),
        features: window.util.getRandomLengthArray(FEATURES_LIST),
        description: '',
        photos: window.util.getRandomLengthArray(PHOTOS)
      },
      location: {
        x: window.util.getRandomNumber(LOCATION_X_MIN, locationXMax()),
        y: window.util.getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
      }
    };
    return proposition;
  }

  function getPropositions(length) {
    var propositionsCount = length || window.pin.MAX_USER_NUMBER;
    var propositions = [];
    for (var j = 0; j < propositionsCount; j++) {
      propositions[j] = generateProposition(j);
    }
    return propositions;
  }

  window.data = {
    PROPERTY_TYPES: PROPERTY_TYPES,
    LOCATION_Y_MIN: LOCATION_Y_MIN,
    LOCATION_Y_MAX: LOCATION_Y_MAX,
    generateProposition: generateProposition,
    getPropositions: getPropositions
  };
})();
