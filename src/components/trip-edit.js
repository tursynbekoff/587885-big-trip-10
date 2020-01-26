import {formatTime, getFullDate} from "../utils/common.js";
import {ROUTE_TYPES} from '../const.js';
import AbstractSmartComponent from './abstract-smart-component.js';
import {CITIES} from '../mock/trip-point.js';

const createTypeButtonMarkup = (types, from, to) => {
  return types.slice(from, to).map((type) => {
    const lowerType = type.toLowerCase();
    return (
      `<div class="event__type-item">
        <input
        id="event-type-${lowerType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="${lowerType}">
        <label class="event__type-label  event__type-label--${lowerType}" for="event-type-${lowerType}-1">${type}</label>
      </div>`
    );
  }).join(`\n`);
};

const createCitiesMarkup = (cities) => {
  return cities.map((city) => {
    return (
      `<option value=${city}></option>`
    );
  }).join(`\n`);
};

const createOffersMarkup = (offers) => {
  return offers.map((offer) => {
    const {type, name, cost, isChecked} = offer;
    return (
      `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
      id="event-offer-${type.toLowerCase()}-1" type="checkbox"
      name="event-offer-${type.toLowerCase()}"
      ${isChecked ? `checked` : ``}>

      <label class="event__offer-label" for="event-offer-${type.toLowerCase()}-1">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${cost}</span>
      </label>
    </div>`
    );
  }).join(`\n`);
};


const createTripEditTemplate = (tripPoint) => {
  const {type, destination, price, offers, startDate, endDate, description} = tripPoint;

  let preposition = `to`;
  if ((type === `Check`) || (type === `Sightseeing`) || (type === `Restaurant`)) {
    preposition = `in`;
  }
  const typeTransferMarkup = createTypeButtonMarkup(ROUTE_TYPES, 3, 9);
  const typeActivityMarkup = createTypeButtonMarkup(ROUTE_TYPES, 0, 3);
  const offersMarkup = createOffersMarkup(offers);


  return `<li class="trip-events__item">
  <form class="event  event--edit" action="#" method="post">
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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createCitiesMarkup(CITIES)}
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

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>

      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
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

    <section class="event__details">

      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${offersMarkup}
          </div>



      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
          </div>
        </div>
      </section>
    </section>
  </form>
</li>`;
};


export default class TripEdit extends AbstractSmartComponent {
  constructor(tripPoint) {
    super();
    this._tripPoint = tripPoint;
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createTripEditTemplate(this._tripPoint);
  }

  rerender() {
    super.rerender();
  }

  reset() {
    // const tripPoint = this._tripPoint;

    this.rerender();
  }

  _subscribeOnEvents() {

  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`)
      .addEventListener(`click`, handler);
  }

  setTypeChangeHandler(handler) {
    this.getElement().querySelector(`.event__type-list`)
    .addEventListener(`change`, handler);
  }

  setCityChangeHandler(handler) {
    this.getElement().querySelector(`.event__input--destination`)
    .addEventListener(`blur`, handler);
  }
}
