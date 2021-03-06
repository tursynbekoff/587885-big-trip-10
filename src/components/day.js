import AbstractComponent from './abstract-component.js';
import {getShortMonthAndDate} from '../utils/common.js';

const createTripDayTemplate = (day, index) => {
  if (day) {
    return `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index}</span>
        <time class="day__date" datetime="${day}">${getShortMonthAndDate(day)}</time>
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
  constructor(day, index) {
    super();
    this._day = day;
    this._index = index;
  }

  getTemplate() {
    return createTripDayTemplate(this._day, this._index);
  }
}
