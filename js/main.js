'use strict';

var MAX_USER_NUMBER = 8;
var MIN_ARRAY_LENGTH = 1;
// var OFFER_ADDRESS = '600, 350';
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
var MAIN_PIN_WIDTH = 160;
var MAIN_PIN_HEIGHT = 160;
// var PIN_WIDTH = 40;
// var PIN_HEIGHT = 66;
// var similarListElement = document.querySelector('.map__pins');
var pin = document.querySelector('.map__pin');
var card = document.querySelector('#card').content.querySelector('.popup');
var onMainMapPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapFiltres = document.querySelector('.map__filters');
var formInputs = adForm.querySelectorAll('input');
var formSelects = adForm.querySelectorAll('select');
var formFieldsets = adForm.querySelectorAll('fieldset');
var roomSelection = document.getElementById('rooms');
var roomNumber = roomSelection.querySelectorAll('option');
var capacity = document.getElementById('capacity');
var guestNumber = capacity.querySelectorAll('option');
var onSubmitButton = adForm.querySelector('ad-form__submit');

// var addressInput = adForm.getElementsByName('address');

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

var getAddressCoordinate = function (width, height) {
  var left = parseInt(onMainMapPin.style.left, 10) + width / 2;
  var top = parseInt(onMainMapPin.style.top, 10) + height / 2;
  return left + ', ' + top;
};

// var getAddressCoordinate = function () {
//   var left = onMainMapPin.style.left + PIN_WIDTH / 2;
//   var top = onMainMapPin.style.top + PIN_HEIGHT;
//   return left + ', ' + top;
// };

var generateProposition = function (j) {
  var proposition = {
    author: {
      avatar: 'img/avatars/user0' + (j + 1) + '.png'
    },
    offer: {
      title: PIN_TITLE + ' ' + (j + 1),
      address: getAddressCoordinate(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT),
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
    propositions[j] = generateProposition(j);
  }
  return propositions;
};

var renderPin = function (proposition) {
  var pinElement = pin.cloneNode(true);

  pinElement.style = 'left: ' + proposition.location.x + 'px; top: ' + proposition.location.y + 'px;';
  pinElement.alt = PIN_TITLE;
  pinElement.src = proposition.author.avatar;

  return pinElement;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var k = 0; k < propositions.length; k++) {
    fragment.appendChild(renderPin(propositions[k]));
  }
  return fragment;
};

var propositions = getPropositions(MAX_USER_NUMBER);

renderPins(propositions);

// similarListElement.appendChild(renderPins());

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

map.appendChild(renderCard(propositions[0]));

var disabledDeletion = function (inputs) {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].removeAttribute('disabled');
  }
};

var pageActivation = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFiltres.classList.remove('ad-form--disabled');
  disabledDeletion(formInputs);
  disabledDeletion(formSelects);
  disabledDeletion(formFieldsets);
};

onMainMapPin.addEventListener('mousedown', pageActivation);

onMainMapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    pageActivation();
  }
});

var checkGuestNumber = function () {
  if (guestNumber.checked.value > roomNumber.checked.value) {
    capacity.setCustomValidity('Количество гостей не должно превышать количество комнат');
  } else {
    capacity.setCustomValidity('');
  }
};

onSubmitButton.addEventListener('click', function () {
  checkGuestNumber();
});
