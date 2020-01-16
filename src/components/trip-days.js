import {getFullDate, getMonthName, createElement} from "../utils.js";

const createTripDaysTemplate = (days) => (
  days.map((elem, index) => (`
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${elem.day}</span>
        <time class="day__date" datetime="${getFullDate(elem.dayDate)}">${getMonthName(elem.dayDate)} ${elem.dayDate.getDate() + index}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>
    `))
    .join(`\n`)
);

export default class TripDays {
  constructor(days) {
    this._days = days;
    this._element = null;
  }

  getTemplate() {
    return createTripDaysTemplate(this._days);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
