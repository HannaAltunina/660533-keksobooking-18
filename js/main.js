'use strict';

var MAX_USER_NUMBER = 8;
var OFFER_ADDRESS = '600, 350';
var PROPERTY_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_DATES = ['12:00', '13:00', '14:00'];
var CHECKOUT_DATES = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_X_MIN = 0;
var map = document.querySelector('.map');
var LOCATION_X_MAX = map.style.width;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_TITLE = 'Заголовок';
var similarListElement = document.querySelector('.map__pins');

var getAuthorAvatarNumber = function () {
  return ('img/avatars/user0' + Math.floor(Math.random() * MAX_USER_NUMBER) + '.png');
};

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random(max - min + 1));
};

var getRandomLengthArray = function (arr) {
  arr = [];
  var newArrayLength = Math.floor(Math.random() * arr.length);

  for (var i = 0; i <= newArrayLength; i++) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  return arr;
};

var genNewProposition = function (proposition) {
  proposition = {
    author: {
      avatar: getAuthorAvatarNumber()
    },
    offer: {
      title: String,
      address: OFFER_ADDRESS,
      price: Number,
      type: getRandomElement(PROPERTY_TYPES),
      rooms: Number,
      guests: Number,
      checkin: getRandomElement(CHECKIN_DATES),
      checkout: getRandomElement(CHECKOUT_DATES),
      features: getRandomLengthArray(FEATURES_LIST),
      description: String,
      photos: getRandomLengthArray(PHOTOS)
    },
    location: {
      x: getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX),
      y: getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
    }
  };
  return proposition;
};

var getPropositionsArray = function (length) {
  var arr = [];
  for (var j = 0; j < length; j++) {
    arr[j] = genNewProposition();
  }
  return arr;
};

var propositions = getPropositionsArray(MAX_USER_NUMBER);

map.classList.remove('map--faded');

var pin = document.querySelector('.map__pin');
var renderPin = function (proposition) {
  var pinElement = pin.cloneNode(true);

  pinElement.style = 'left: ' + proposition.location.x + 'px; top: ' + proposition.location.y + 'px;';
  pinElement.alt = PIN_TITLE;
  pinElement.src = proposition.author.avatar;

  return pinElement;
};

var fragment = document.createDocumentFragment();

var getFragmentChildren = function () {
  for (var k = 0; k < propositions.length; k++) {
    fragment.appendChild(renderPin(propositions[k]));
  }
};

getFragmentChildren(propositions);

similarListElement.appendChild(fragment);

