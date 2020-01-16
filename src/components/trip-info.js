import {getMonthName, createElement} from "../utils.js";

const createCitiesTemplate = (points) => {
  return points.map(({destination}) => destination).join(` — `);
};

const getTripDates = (data) => {
  const lastIndex = data.length - 1;
  const dayDate = data[lastIndex].dayDate;
  return `${getMonthName(data[0].dayDate)} ${data[0].dayDate.getDate()}&nbsp;—&nbsp;${dayDate.getDate() + lastIndex}`;
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

export default class TripInfo {
  constructor(days) {
    this._days = days;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this.days);
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

