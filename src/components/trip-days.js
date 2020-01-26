import {getFullDate, getMonthName} from "../utils/common.js";
import AbstractComponent from './abstract-component.js';

const createTripDayTemplate = (day) => {
  if (day.day && day.dayDate) {
    return `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day.day}</span>
        <time class="day__date" datetime="${getFullDate(day.dayDate)}">${getMonthName(day.dayDate)} ${day.dayDate.getDate()}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`;
  } else {
    return `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter"></span>
        <time class="day__date" datetime=""></time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`;
  }
};

export default class TripDay extends AbstractComponent {
  constructor(day) {
    super();
    this._day = day;
  }

  getTemplate() {
    return createTripDayTemplate(this._day);
  }
}
