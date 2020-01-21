import {getFullDate, getMonthName} from "../utils/common.js";
import AbstractComponent from './abstract-component.js';

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

export default class TripDay extends AbstractComponent {
  constructor(day) {
    super();
    this._day = day;
  }

  getTemplate() {
    return createTripDayTemplate(this._day);
  }
}
