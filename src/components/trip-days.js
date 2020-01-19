import {getFullDate, getMonthName, createElement} from "../utils.js";
// import {days} from "../mock/trip-point.js";

const createTripDayTemplate = (day) => (
  `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day.day}</span>
        <time class="day__date" datetime="${getFullDate(day.dayDate)}">${getMonthName(day.dayDate)} ${day.dayDate.getDate() + day.day}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
);

export default class TripDay {
  constructor(day) {
    this._day = day;
    this._element = null;
  }

  getTemplate() {
    return createTripDayTemplate(this._day);
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
