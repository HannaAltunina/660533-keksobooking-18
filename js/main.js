'use strict';

var MAX_USER_NUMBER = 8;
var MIN_ARRAY_LENGTH = 1;
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
var map = document.querySelector('.map');
var LOCATION_X_MAX = map.style.width;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_TITLE = 'Заголовок';
var similarListElement = document.querySelector('.map__pins');
var pin = document.querySelector('.map__pin');
var card = document.querySelector('#card').content.querySelector('.popup');

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};


var getRandomLengthArray = function (arr) {

  var length = getRandomNumber(MIN_ARRAY_LENGTH, arr.length);
  var newArr = [];
  for (var i = 0; i < length; i++) {
    newArr[i] = getRandomElement(arr);
  }
  return newArr;
};

var getGuestsNumber = function (rooms) {
  return (rooms === 1) ? ('для ' + rooms + ' гостя') : ('для ' + rooms + ' гостей');
};

var generateProposition = function (proposition) {
  proposition = {
    author: {
      avatar: 'img/avatars/user0' + 'j + 1' + '.png'
    },
    offer: {
      title: '',
      address: OFFER_ADDRESS,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomElement(PROPERTY_TYPES),
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getGuestsNumber(getRandomNumber(MIN_ROOMS, MAX_ROOMS)),
      checkin: getRandomElement(CHECKIN_DATES),
      checkout: getRandomElement(CHECKOUT_DATES),
      features: getRandomLengthArray(FEATURES_LIST),
      description: '',
      photos: getRandomLengthArray(PHOTOS)
    },
    location: {
      x: getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX),
      y: getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
    }
  };
  return proposition;
};

var getPropositions = function (length) {
  var propositions = [];
  for (var j = 0; j < length; j++) {
    propositions[j] = generateProposition();
  }
  return propositions;
};

map.classList.remove('map--faded');

var renderPin = function (proposition) {
  var pinElement = pin.cloneNode(true);

  pinElement.style = 'left: ' + proposition.location.x + 'px; top: ' + proposition.location.y + 'px;';
  pinElement.alt = PIN_TITLE;
  pinElement.src = proposition.author.avatar;

  return pinElement;
};

var renderPins = function () {
  var propositions = getPropositions(MAX_USER_NUMBER);
  var fragment = document.createDocumentFragment();
  for (var k = 0; k < propositions.length; k++) {
    fragment.appendChild(renderPin(propositions[k]));
  }
  return fragment;
};

renderPins();

similarListElement.appendChild(renderPins());

var renderCard = function (proposition) {
  var cardElement = card.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = proposition.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = proposition.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = proposition.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = proposition.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = proposition.offer.rooms + ' комнаты для ' + proposition.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + proposition.offer.checkin + ', выезд до ' + proposition.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = proposition.offer.features;
  cardElement.querySelector('.popup__description').textContent = proposition.offer.description;
  cardElement.querySelector('.popup__photos').src = proposition.offer.photos;
  cardElement.querySelector('.popup__avatar').src = proposition.author.avatar;
  return cardElement;
};

renderCard();
map.appendChild(renderCard());
