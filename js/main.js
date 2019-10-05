'use strict';

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
var map = document.querySelector('.map');
var LOCATION_X_MIN = 0;
var widthContentArea = document.documentElement.clientWidth;
var BODY_WIDTH = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_TITLE = 'Заголовок';
var PIN_WIDTH = 40;
var PIN_HEIGHT = 132;
var similarListElement = document.querySelector('.map__pins');
var pin = document.querySelector('#pin').content;
var mainPin = document.querySelector('.map__pin--main');
var card = document.querySelector('#card').content.querySelector('.popup');
var adForm = document.querySelector('.ad-form');
var mapFiltres = document.querySelector('.map__filters');
var formInputs = adForm.querySelectorAll('input');
var formSelects = adForm.querySelectorAll('select');
var formFieldsets = adForm.querySelectorAll('fieldset');
var roomSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');
var typeSelect = document.querySelector('#type');
var priceInput = document.querySelector('#price');
var timeinSelect = document.querySelector('#timein');
var timeoutSelect = document.querySelector('#timeout');
var addressInput = document.querySelector('#address');
var submit = document.querySelector('.ad-form__submit');

var locationXMax = function () {
  return (widthContentArea < BODY_WIDTH) ? widthContentArea : BODY_WIDTH;
};

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
  return (parseInt(mainPin.style.left, 10) + width / 2) + ', ' + (parseInt(mainPin.style.top, 10) + height);
};

var generateProposition = function (j) {
  var proposition = {
    author: {
      avatar: 'img/avatars/user0' + (j + 1) + '.png'
    },
    offer: {
      title: PIN_TITLE + ' ' + (j + 1),
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
      x: getRandomNumber(LOCATION_X_MIN, locationXMax()),
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

var getConformity = function (element, arr1, arr2) {
  var conformity = '';
  for (var i = 0; i < arr1.length; i++) {
    if (element === arr1[i]) {
      conformity = arr2[i];
    }
  }
  return conformity;
};

var renderPin = function (proposition) {
  var pinElement = pin.cloneNode(true);
  pinElement.style = 'left: ' + proposition.location.x + 'px; top: ' + proposition.location.y + 'px;';
  pinElement.alt = PIN_TITLE;
  pinElement.src = proposition.author.avatar;

  return pinElement;
};

var propositions = getPropositions(MAX_USER_NUMBER);

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < propositions.length; i++) {
    fragment.appendChild(renderPin(propositions[i]));
  }
  return fragment;
};

var renderCard = function (proposition) {
  var cardElement = card.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = proposition.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = proposition.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = proposition.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getConformity(proposition.offer.type, PROPERTY_TYPES, TRANSLATE_PROPERTIES);
  cardElement.querySelector('.popup__text--capacity').textContent = proposition.offer.rooms + ' комнаты для ' + proposition.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + proposition.offer.checkin + ', выезд до ' + proposition.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = proposition.offer.features;
  cardElement.querySelector('.popup__description').textContent = proposition.offer.description;
  cardElement.querySelector('.popup__photos').src = proposition.offer.photos;
  cardElement.querySelector('.popup__avatar').src = proposition.author.avatar;
  return cardElement;
};

var setupDisabled = function (inputs) {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute('disabled', 'disabled');
  }
};

var disabledDeletion = function (inputs) {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].removeAttribute('disabled');
  }
};

var pageDeactivation = function () {
  setupDisabled(formInputs);
  setupDisabled(formSelects);
  setupDisabled(formFieldsets);
  mapFiltres.classList.add('ad-form--disabled');
};

pageDeactivation();

var pageActivation = function () {
  similarListElement.appendChild(renderPins());
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFiltres.classList.remove('ad-form--disabled');
  disabledDeletion(formInputs);
  disabledDeletion(formSelects);
  disabledDeletion(formFieldsets);
  addressInput.value = getAddressCoordinate(PIN_WIDTH, PIN_HEIGHT);
};

mainPin.addEventListener('mousedown', pageActivation);

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    pageActivation();
  }
});

var openPropositionCard = function () {
  map.appendChild(renderCard());
};

pin.addEventListener('click', openPropositionCard);

var checkRooms = function () {
  var roomsSelectedOption = roomSelect.options[roomSelect.selectedIndex].value;
  var capacitySelectedOption = capacitySelect.options[capacitySelect.selectedIndex].value;

  if (capacitySelectedOption > roomsSelectedOption) {
    capacitySelect.setCustomValidity('Количество гостей не должно превышать количество комнат');
    capacitySelect.validity = false;
  } else {
    capacitySelect.setCustomValidity('');
  }
};

var changePricePlaceholder = function () {
  var typeSelectedOption = typeSelect.options[typeSelect.selectedIndex].value;
  var priceComform = getConformity(typeSelectedOption, PROPERTY_TYPES, MIN_PRICES);

  priceInput.placeholder = 'от ' + priceComform;
};


var checkPropertyPrices = function () {
  var typeSelectedOption = typeSelect.options[typeSelect.selectedIndex].value;
  var priceConform = getConformity(typeSelectedOption, PROPERTY_TYPES, MIN_PRICES);
  var translateType = getConformity(typeSelectedOption, PROPERTY_TYPES, TRANSLATE_PROPERTIES);

  if (priceInput.value < priceConform) {
    priceInput.setCustomValidity('Минимальная стоимость проживания за ночь ' + priceConform + ' в объекте ' + translateType);
    priceInput.validity = false;
  } else {
    priceInput.setCustomValidity('');
  }
};

var getConformTime = function () {
  var timeinSelectedOption = timeinSelect.options[timeinSelect.selectedIndex].value;
  var timeoutSelectToCheck = getConformity(timeinSelectedOption, timeinSelect, timeoutSelect);
  for (var i = 0; i < timeoutSelect.options.length; i++) {
    if (timeoutSelect.options[i].value === timeoutSelectToCheck) {
      // timeoutSelect.options[timeoutSelect.selectedIndex].removeAttribute('selected');
      timeoutSelect.options[i] = timeoutSelect[timeoutSelect.selectedIndex].defaultSelected;
      // timeoutSelect.options[i].selected = true;
      // timeoutSelect.options[i].setAttribute('selected', 'selected');
    } else {
      timeoutSelect.setCustomValidity('время выезда соответствует времени заезда ' + timeoutSelectToCheck);
      timeoutSelect.options[i].validity = false;
    }
  }
};


capacitySelect.addEventListener('change', checkRooms);
roomSelect.addEventListener('change', checkRooms);
priceInput.addEventListener('change', checkPropertyPrices);
typeSelect.addEventListener('change', changePricePlaceholder);
timeinSelect.addEventListener('change', getConformTime);


submit.addEventListener('click', checkRooms, checkPropertyPrices);
