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


const createCostTemplate = (points) => {
  let fullPrice = 0;
  if (points.length !== 0) {
    fullPrice = points.reduce((price, point) => price + point.price, 0);
    // document.querySelector(`.trip-info__cost-value`).textContent = fullPrice;
  }
  return fullPrice;
};


const createTripInfoTemplate = (points) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${createCitiesTemplate(points)}</h1>

              <p class="trip-info__dates">${getTripDates(points)}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${createCostTemplate(points)}</span>
            </p>
          </section>`
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

