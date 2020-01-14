import {createOffersTemplate} from './trip-offers';
import {formatTimeDuration, formatTime} from '../utils.js';

export const createDayMarkup = (tripPoint) => {
  const {type, destination, price, offers, startDate, endDate, duration} = tripPoint;
  const extraOffers = createOffersTemplate(Array.from(offers));


  let preposition = `to`;
  if ((type === `Check`) || (type === `Sightseeing`) || (type === `Restaurant`)) {
    preposition = `in`;
  }

  return `<li class="trip-events__item">
  <div class="event">
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${preposition} ${destination}</h3>

    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${formatTime(startDate)}">${formatTime(startDate)}</time>
        &mdash;
        <time class="event__end-time" datetime="${formatTime(endDate)}">${formatTime(endDate)}</time>
      </p>
      <p class="event__duration">${formatTimeDuration(duration)}</p>
    </div>

    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>

    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${extraOffers}
    </ul>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};


