import {getFullDate, getMonthName} from "../utils.js";


export const createTripDaysTemplate = (days) => (
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
