import {formatTime, getFullDate, getOffers, getTimeFromForm, getNumberFromDate} from "../utils/common.js";
import {ROUTE_TYPES} from '../const.js';
import AbstractSmartComponent from './abstract-smart-component.js';
// import {CITIES, DESTINATIONS, OFFERS} from '../mock/trip-point.js';
import flatpickr from 'flatpickr';
import {tripDestinations, tripOffers} from '../main.js';
// debugger;

const isAllowedDestination = (destination) => {
  const isDestinationFromList = tripDestinations.includes(destination); // поправить? тут
  return isDestinationFromList;
};

const isAllowedPriceValue = (price) => {
  const isPriceNumber = isFinite(price);
  return isPriceNumber;
};

const isAllowedTime = (startDate, endDate) => {
  const firstDate = getNumberFromDate(startDate);
  const secondDate = getNumberFromDate(endDate);
  const isStartDateLessEndDate = (firstDate) && (secondDate) && (firstDate < secondDate);
  return isStartDateLessEndDate;
};

const createTypeButtonMarkup = (types, from, to, tripPoint) => {
  return types.slice(from, to).map((type) => {
    const lowerType = type.toLowerCase();
    return (
      `<div class="event__type-item">
        <input
        id="event-type-${lowerType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="${lowerType}" ${tripPoint.type.toLowerCase() === type.toLowerCase() ? `checked` : ``}>
        <label class="event__type-label  event__type-label--${lowerType}" for="event-type-${lowerType}-1">${type}</label>
      </div>`
    );
  }).join(`\n`);
};

const createCitiesMarkup = () => {
  return tripDestinations.map((it) => {
    // const hello = it;
    // debugger;
    return (
      `<option value=${it.name}></option>`
    );
  }).join(`\n`);
  // debugger;
};

const createDescriptionSection = (destination) => {
  // debugger;
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
      id="event-offer-${type.toLowerCase()}-${index}" type="checkbox"
      name="event-offer"
      ${pointOffers.includes(offer) ? `checked` : ``}
      >

      <label class="event__offer-label" for="event-offer-${type.toLowerCase()}-${index}">
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

const createTripEditTemplate = (tripPoint) => {

  const {type, destination, price, offers, startDate, endDate, isFavorite} = tripPoint;
  const isBlockSaveButton = isAllowedDestination(destination) && isAllowedPriceValue && isAllowedTime(startDate, endDate);
  let preposition = `to`;
  if ((type === `Check`) || (type === `Sightseeing`) || (type === `Restaurant`)) {
    preposition = `in`;
  }
  const typeTransferMarkup = createTypeButtonMarkup(ROUTE_TYPES, 3, 9, tripPoint);
  const typeActivityMarkup = createTypeButtonMarkup(ROUTE_TYPES, 0, 3, tripPoint);
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
          ${type} ${preposition}
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
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFullDate(startDate)} ${formatTime(startDate)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFullDate(endDate)} ${formatTime(endDate)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${isBlockSaveButton ? `disabled` : ``}>Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>

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
  const index = tripOffers.findIndex((it) => it.type.toLowerCase() === typePoint.toLowerCase());
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
  const startDate = getTimeFromForm(formData, `event-start-time`);
  const endDate = getTimeFromForm(formData, `event-end-time`);
  const destination = tripDestinations.find((it) => it.name === formData.get(`event-destination`));
  const type = formData.get(`event-type`).charAt(0).toUpperCase() + formData.get(`event-type`).slice(1);
  const offers = getCheckedOffers(form, type);
  return {
    type,
    destination,
    offers,
    price: parseInt(formData.get(`event-price`), 10),
    startDate,
    endDate,
    isFavorite: formData.get(`event-favorite`),
    duration: endDate - startDate,
  };
};

export default class TripEdit extends AbstractSmartComponent {
  constructor(tripPoint) {
    super();
    this._original = tripPoint;
    this._tripPoint = Object.assign({}, tripPoint);
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
    return createTripEditTemplate(this._tripPoint);
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
      this._tripPoint.type = (evt.target.value).charAt(0).toUpperCase() + (evt.target.value).slice(1);
      this._tripPoint.offers = getOffers(tripOffers, this._tripPoint.type);
      this.rerender();
    });

    element.querySelector(`.event__input--price`)
    .addEventListener(`blur`, (evt) => {
      const priceValue = evt.target.value;
      saveButton.disabled = !isAllowedPriceValue(priceValue);
    });

    element.querySelector(`.event__field-group--time`)
    .addEventListener(`change`, () => {
      const startDate = element.querySelector(`#event-start-time-1`).value;
      const endDate = element.querySelector(`#event-end-time-1`).value;
      saveButton.disabled = !isAllowedTime(startDate, endDate);
    });

    element.querySelector(`.event__input--destination`)
    .addEventListener(`blur`, (evt) => {
      const destinationName = (evt.target.value).charAt(0).toUpperCase() + (evt.target.value).slice(1);
      saveButton.disabled = !isAllowedDestination(destinationName);
      const destination = tripDestinations.filter((it) => it.name === destinationName)[0];

      this._tripPoint.destination = destination;
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
      allowInput: true,
      altInout: true,
      altFormat: `d/m/y H:i`,
      dateFormat: `d/m/y H:i`,
      // eslint-disable-next-line camelcase
      time_24hr: true,
      defaultDate: this._tripPoint[dateType] === null ? new Date() : this._tripPoint[dateType],
    });
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
}
