import moment from 'moment';
// import {getMonthName} from "../utils/common.js";
import AbstractComponent from './abstract-component.js';


// не забыть поправить константы и функцию сортед дейс, она повторяется и здесь нахер не нужна
const createCitiesTemplate = (points) => {
  const sortedPoints = points.sort((a, b) => a.startDate > b.startDate);
  if (sortedPoints.length <= 2) {
    return sortedPoints.map(({destination}) => destination).join(` — `);
  } else {
    return `${sortedPoints[0].destination.name} — ... —  ${sortedPoints[sortedPoints.length - 1].destination.name}`;
  }
};

const getTripDates = (points) => {
  const sortedPoints = points.sort((a, b) => a.startDate > b.startDate);
  return `${moment(new Date(sortedPoints[0].startDate)).format(`MMM DD`)} — ${moment(new Date(sortedPoints[sortedPoints.length - 1].startDate)).format(`MMM DD`)}`;
};

const createTripInfoTemplate = (points) => {
  const citiesTemplate = createCitiesTemplate(points);
  return (
    `<div class="trip-info__main">
    <h1 class="trip-info__title">${citiesTemplate}</h1>
    <p class="trip-info__dates">${getTripDates(points)}</p>
    </div>`
  );
};

export default class TripInfo extends AbstractComponent {
  constructor(points) {
    super();
    this.points = points;
  }

  getTemplate() {
    return createTripInfoTemplate(this.points);
  }
}

