import {getOffers, getIOSTimeFromForm, capitalizeString, getDateAndTime, getUnixFromFlatpickr} from "../utils/common.js";
import {ACTIVITY_TYPES, TRANSPORT_TYPES, MS_PER_SECONDS, DefaultDataButton} from '../const.js';
import AbstractSmartComponent from './abstract-smart-component.js';
import flatpickr from 'flatpickr';
import {tripDestinations, tripOffers} from '../main.js';
import PointModel from '../models/point.js';

const Preposition = {
  ACTIVITY: `in`,
  TRANSPORT: `to`,
};

const isAllowedDestination = (destination) => {
  const isDestinationFromList = tripDestinations.map((it) => it.destination.name).includes(destination);
  return isDestinationFromList;
};

const isAllowedPriceValue = (price) => isFinite(price);

const isAllowedTime = (startDate, endDate) => {
  const isStartDateLessEndDate = (startDate) && (endDate) && (startDate < endDate);
  return isStartDateLessEndDate;
};

const createTypeButtonMarkup = (types, tripPoint) => {
  return types.map((type) => {
    return (
      `<div class="event__type-item">
        <input
        id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="${type}" ${tripPoint.type === type ? `checked` : ``}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeString(type)}</label>
      </div>`
    );
  }).join(`\n`);
};

const createCitiesMarkup = () => {
  return tripDestinations.map((it) => {
    return (
      `<option value=${it.destination.name}></option>`
    );
  }).join(`\n`);
};

const createDescriptionSection = (destination) => {
  if (destination) {
    return (
      `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${createImagesMarkup(destination.pictures)}
        </div>
      </div>
    </section>`
    );
  } else {
    return ``;
  }
};

const createImagesMarkup = (pictures) => {
  if (pictures) {
    return pictures.map((picture) => {
      return (
        `<img class="event__photo" src="${picture.src}" alt="Event photo"></img>`
      );
    }).join(`\n`);
  } else {
    return ``;
  }

};

const createOffersSection = (offers, type) => {
  const offersForThisType = getOffers(tripOffers, type);
  if (offersForThisType[0]) {
    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${createOffersMarkup(offers, type, offersForThisType)}
        </div>
        </section>`
    );
  } else {
    return ``;
  }
};

const createOffersMarkup = (pointOffers, type, offersForThisType) => {
  return offersForThisType.map((offer, index) => {
    const {title, price} = offer;
    return (
      `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
      id="event-offer-${type}-${index}" type="checkbox"
      name="event-offer"
      ${pointOffers.findIndex((it) => it.title === title) > -1 ? `checked` : ``}
      >

      <label class="event__offer-label" for="event-offer-${type}-${index}">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
    );
  }).join(`\n`);
};

const createOffersAndDescriptionMarkup = (destination, offers, type) => {
  const offersMarkup = createOffersSection(offers, type);
  const descriptionMarkup = createDescriptionSection(destination);
  if (offersMarkup + descriptionMarkup === ``) {
    return ``;
  } else {
    return (
      `<section class="event__details">
        ${offersMarkup}
        ${descriptionMarkup}
      </section>`
    );
  }
};

const createTripEditTemplate = (tripPoint, externalData) => {
  const {type, destination, price, offers, startDate, endDate, isFavorite} = tripPoint;
  const isBlockSaveButton = !(isAllowedDestination(destination.name) && isAllowedPriceValue(price) && isAllowedTime(startDate, endDate));
  const deleteButtonText = externalData.DELETE_BUTTON_TEXT;
  const saveButtonText = externalData.SAVE_BUTTON_TEXT;
  let preposition = Preposition.TRANSPORT;
  if (ACTIVITY_TYPES.includes(type)) {
    preposition = Preposition.ACTIVITY;
  }
  const typeTransferMarkup = createTypeButtonMarkup(TRANSPORT_TYPES, tripPoint);
  const typeActivityMarkup = createTypeButtonMarkup(ACTIVITY_TYPES, tripPoint);
  const offersAndDescriptionMarkup = createOffersAndDescriptionMarkup(destination, offers, type);
  return (
    `<form class="event  event--edit" action="#" method="get">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
          ${typeTransferMarkup}
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>
          ${typeActivityMarkup}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${capitalizeString(type)} ${preposition}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination ? destination.name : ``}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createCitiesMarkup()}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateAndTime(startDate)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateAndTime(endDate)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${isBlockSaveButton ? `disabled` : ``}>${saveButtonText}</button>
      <button class="event__reset-btn" type="reset">${deleteButtonText}</button>

      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    ${offersAndDescriptionMarkup}
  </form>
`);
};

const getOffersByTitle = (offerTitles, typePoint) => {
  const index = tripOffers.findIndex((it) => it.type === typePoint.toLowerCase());
  const offersForThisType = tripOffers[index].offers;
  let suitibleOffers = [];
  for (let i = 0; i < offersForThisType.length; i++) {
    if (offerTitles.includes(offersForThisType[i].title)) {
      suitibleOffers.push(offersForThisType[i]);
    }
  }
  return suitibleOffers;
};

const getCheckedOffers = (element, type) => {
  const offersTitles = element.querySelectorAll(`.event__offer-title`);
  let offersCheckedTitles = [];
  for (let i = 0; i < offersTitles.length; i++) {
    if (offersTitles[i].parentNode.previousElementSibling.checked) {
      offersCheckedTitles.push(offersTitles[i].innerHTML);
    }
  }
  if (!offersCheckedTitles.length) {
    return [];
  } else {
    const offers = getOffersByTitle(offersCheckedTitles, type);
    return offers;
  }
};


const parseFormData = (form, formData) => {
  const startDate = getIOSTimeFromForm(formData, `event-start-time`);
  const endDate = getIOSTimeFromForm(formData, `event-end-time`);
  const destination = tripDestinations.find((it) => it.destination.name === formData.get(`event-destination`)).destination;
  const type = formData.get(`event-type`);
  const offers = getCheckedOffers(form, type);
  const price = parseInt(formData.get(`event-price`), 10);
  return new PointModel({
    'type': type.toLowerCase(),
    'destination': destination,
    'offers': offers,
    'base_price': price,
    'date_from': startDate,
    'date_to': endDate,
    'is_favorite': formData.get(`event-favorite`),
  });
};

export default class TripEdit extends AbstractSmartComponent {
  constructor(tripPoint) {
    super();
    this._original = tripPoint;
    this._tripPoint = Object.assign({}, tripPoint);
    this._externalData = DefaultDataButton;
    this._flatpickr = null;
    this._applyFlatpickr();
    this._subscribeOnEvents();
    this._deleteButtonClickHandler = null;
    this._submitHandler = null;

  }

  removeElement() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    super.removeElement();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this.setCloseButtonClickHandler(this._closeButtonClickHandler);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createTripEditTemplate(this._tripPoint, this._externalData);
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  reset() {
    this.rerender();
  }

  getData() {
    const form = this.getElement();
    const formData = new FormData(form);
    return parseFormData(form, formData);
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultDataButton, data);
    this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
    this._closeButtonClickHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const saveButton = this.getElement().querySelector(`.event__save-btn`);

    element.querySelector(`.event__favorite-checkbox`)
    .addEventListener(`click`, () => {
      this._tripPoint.isFavorite = !this._tripPoint.isFavorite;
      this.rerender();
    });

    element.querySelector(`.event__type-list`)
    .addEventListener(`change`, (evt) => {
      this._tripPoint.type = (evt.target.value).toLowerCase();
      this._tripPoint.offers = [];
      this.rerender();
    });

    element.querySelector(`.event__input--price`)
    .addEventListener(`blur`, (evt) => {
      const priceValue = evt.target.value;
      this._tripPoint.price = priceValue;
      saveButton.disabled = !isAllowedPriceValue(priceValue);
    });

    const offersElement = element.querySelector(`.event__available-offers`);
    if (offersElement) {
      offersElement.addEventListener(`change`, (evt) => {
        this._tripPoint.offers = getCheckedOffers(evt.currentTarget, this._tripPoint.type);
      });
    }

    element.querySelector(`.event__field-group--time`)
    .addEventListener(`change`, () => {
      const startDate = getUnixFromFlatpickr(element.querySelector(`#event-start-time-1`).value);
      const endDate = getUnixFromFlatpickr(element.querySelector(`#event-end-time-1`).value);
      saveButton.disabled = !isAllowedTime(startDate, endDate);
      this._tripPoint.startDate = new Date(startDate * MS_PER_SECONDS);
      this._tripPoint.endDate = new Date(endDate * MS_PER_SECONDS);
    });

    element.querySelector(`.event__input--destination`)
    .addEventListener(`blur`, (evt) => {
      const destinationName = (evt.target.value);
      const TRIP_DESTINATIONS = tripDestinations;
      saveButton.disabled = !isAllowedDestination(destinationName);
      const destination = TRIP_DESTINATIONS.filter((it) => it.destination.name === destinationName)[0];
      if (destination) {
        this._tripPoint.destination = destination.destination;
      } else {
        this._tripPoint.destination = ``;
      }
      this.rerender();
    });
  }

  _applyFlatpickr() {
    const DateType = {
      START: `start`,
      END: `end`,
    };


    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }
    this._applyFlatpickrItem(DateType.START);
    this._applyFlatpickrItem(DateType.END);
  }

  _applyFlatpickrItem(dateType) {
    const dateElement = this.getElement().querySelector(`#event-${dateType}-time-1`);
    this._flatpickr = flatpickr(dateElement, {
      'allowInput': true,
      'altInout': true,
      'altFormat': `d/m/y H:i`,
      'dateFormat': `d/m/y H:i`,
      'time_24hr': true,
      'defaultDate': this._tripPoint[dateType] === null ? new Date() : this._tripPoint[dateType],
    });
  }
}
