'use strict';

(function () {
  var MIN_PRICES = ['10000', '1000', '5000', '0'];
  var MAX_PRICE = 1000000;
  var MAX_ROOMS_NUMBER = 100;
  var NOT_FOR_GUESTS_VALUE = 0;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_WIDTH = 70;
  var IMAGE_HEIGHT = 70;
  var AVATAR_SOURCE = 'img/muffin-grey.svg';

  var roomSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var typeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');
  var reset = document.querySelector('.ad-form__reset');
  var filtersForm = document.querySelector('.map__filters');
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var imagesChooser = document.querySelector('#images');
  var imagesPreview = document.querySelector('.ad-form__photo');


  function uploadPhoto(chooser, preview) {
    var file = chooser.files[0];

    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  function onAvatarInputClick() {
    avatarPreview.innerHTML = '';
    uploadPhoto(avatarChooser, avatarPreview);
  }

  function deleteAvatar() {
    avatarPreview.src = AVATAR_SOURCE;
  }

  function onImagesInputClick() {
    var imageContainer = document.createElement('img');
    imageContainer.classList.add('ad-form__image-preview');
    imageContainer.width = IMAGE_WIDTH;
    imageContainer.height = IMAGE_HEIGHT;
    imagesPreview.appendChild(imageContainer);
    uploadPhoto(imagesChooser, imageContainer);
  }

  function deletePreviewImages() {
    var previewImages = document.querySelectorAll('.ad-form__image-preview');
    previewImages.forEach(function (previewImage) {
      imagesPreview.removeChild(previewImage);
    });
  }

  avatarChooser.addEventListener('change', onAvatarInputClick);
  imagesChooser.addEventListener('change', onImagesInputClick);


  function checkRooms() {
    var roomsSelectedOption = (parseInt(roomSelect.options[roomSelect.selectedIndex].value, 10));
    var capacitySelectedOption = (parseInt(capacitySelect.options[capacitySelect.selectedIndex].value, 10));

    capacitySelect.setCustomValidity('');

    if (roomsSelectedOption === MAX_ROOMS_NUMBER && capacitySelectedOption !== NOT_FOR_GUESTS_VALUE) {
      capacitySelect.setCustomValidity('100 комнат не предназначены для размещения гостей');
    } else if (roomsSelectedOption !== MAX_ROOMS_NUMBER && capacitySelectedOption === NOT_FOR_GUESTS_VALUE) {
      capacitySelect.setCustomValidity('Вариант "не для гостей" доступен для 100 комнат');
    } else if (capacitySelectedOption > roomsSelectedOption) {
      capacitySelect.setCustomValidity('Количество гостей не должно превышать количество комнат');
    }
  }

  function changePricePlaceholder() {
    var typeSelectedOption = typeSelect.options[typeSelect.selectedIndex].value;
    var priceComform = window.util.getConformity(typeSelectedOption, window.card.PROPERTY_TYPES, MIN_PRICES);

    priceInput.placeholder = 'от ' + priceComform;
  }

  function checkPropertyPrices() {
    var typeSelectedOption = typeSelect.options[typeSelect.selectedIndex].value;
    var priceConform = window.util.getConformity(typeSelectedOption, window.card.PROPERTY_TYPES, MIN_PRICES);
    var translateType = window.util.getConformity(typeSelectedOption, window.card.PROPERTY_TYPES, window.card.TRANSLATE_PROPERTIES);
    var priceValue = priceInput.value;

    if (parseInt(priceValue, 10) < parseInt(priceConform, 10)) {
      priceInput.setCustomValidity('Минимальная стоимость проживания за ночь ' + priceConform + ' в объекте ' + translateType);
    } else {
      priceInput.setCustomValidity('');
    }
  }

  function getConformTime(timeSelect1, timeSelect2) {
    return function () {
      timeSelect1.value = timeSelect2.value;
    };
  }

  function onTypeSelectClick() {
    if (priceInput.value === '') {
      changePricePlaceholder();
    } else {
      checkPropertyPrices();
    }
  }

  function checkPrice() {
    if (parseInt(priceInput.value, 10) > MAX_PRICE) {
      priceInput.setCustomValidity('Максимальная стоимость проживания за ночь ' + MAX_PRICE);
    } else {
      checkPropertyPrices();
    }
  }

  function checkForm() {
    checkPrice();
    checkRooms();
  }

  var getConformTimeOut = getConformTime(timeoutSelect, timeinSelect);
  var getConformTimeIn = getConformTime(timeinSelect, timeoutSelect);

  timeinSelect.addEventListener('change', getConformTimeOut);
  timeoutSelect.addEventListener('change', getConformTimeIn);

  capacitySelect.addEventListener('change', checkRooms);
  roomSelect.addEventListener('change', checkRooms);
  priceInput.addEventListener('change', checkPrice);
  typeSelect.addEventListener('change', onTypeSelectClick);

  checkForm();

  reset.addEventListener('click', function (evt) {
    evt.preventDefault();
    deleteAvatar();
    deletePreviewImages();
    window.data.form.reset();
    filtersForm.reset();
    window.main.setPinOnMap();
    window.main.setAddressInputValue();
    window.card.closeCards();
    window.pin.pinDeactivation();
    window.pin.deleteRenderedPins();
    window.main.pageDeactivation();
    window.data.map.classList.add('map--faded');
    window.main.adForm.classList.add('ad-form--disabled');
  });

  window.data.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.data.form), window.data.onSuccess, window.data.onError);
  });
})();
