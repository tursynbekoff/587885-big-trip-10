import {getMonthName} from "../utils/common.js";
import AbstractComponent from './abstract-component.js';

const createCitiesTemplate = (points) => {
  if (points.length <= 2) {
    return points.map(({destination}) => destination).join(` — `);
  } else {
    return `${points[0].destination.name} — ... —  ${points[points.length - 1].destination.name}`;
  }
};

const getTripDates = (data) => {
  const lastIndex = data.length - 1;
  const dayDate = data[lastIndex].dayDate;
  return `${getMonthName(data[0].dayDate)} ${data[0].dayDate.getDate()}&nbsp;—&nbsp;${dayDate.getDate()}`;
};

const createTripInfoTemplate = (days) => {
  const citiesTemplate = createCitiesTemplate(days.map((day) => day.dayInfo).flat());
  return (
    `<div class="trip-info__main">
    <h1 class="trip-info__title">${citiesTemplate}</h1>
    <p class="trip-info__dates">${getTripDates(days)}</p>
    </div>`
  );
};

export default class TripInfo extends AbstractComponent {
  constructor(days) {
    super();
    this._days = days;
  }

  getTemplate() {
    return createTripInfoTemplate(this._days);
  }
}

