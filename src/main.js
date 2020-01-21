import FilterComponent from './components/filter.js';
import SiteMenuComponent from './components/menu.js';
// import TripInfoComponent from './components/trip-info';
// import SortingComponent from './components/sorting.js';
import TripBoardComponent from './components/trip-board.js';
import BoardController from './controllers/trip-board.js';
// import TripInfoController from './controllers/trip-info.js';
// import TripPointComponent from './components/trip-point.js';
// import NoPointComponent from './components/no-trip-point.js';
// import TripEditComponent from './components/trip-edit.js';
// import TripDayComponent from './components/trip-days';
import {RenderPosition, render} from './utils/render.js';
import TripInfoComponent from './components/trip-info';

import {filters} from './mock/filter';
import {menu} from './mock/menu';
import {days} from './mock/trip-point';
// const days = [];

const headerElement = document.querySelector(`.page-header`);
const controlElement = headerElement.querySelector(`.trip-controls`);

render(controlElement, new SiteMenuComponent(menu), RenderPosition.BEFOREEND);
render(controlElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const mainElement = document.querySelector(`.page-main`);
const tripEventsElement = mainElement.querySelector(`.trip-events`);

const tripInfoElement = headerElement.querySelector(`.trip-info`);
render(tripInfoElement, new TripInfoComponent(days), RenderPosition.AFTERBEGIN);

const tripBoardComponent = new TripBoardComponent();
render(tripEventsElement, tripBoardComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(tripBoardComponent);
boardController.render(days);

let fullPrice = 0;
if (days.length !== 0) {
  fullPrice = days.flatMap((day) => day.dayInfo).reduce((price, point) => price + point.price, 0);
  document.querySelector(`.trip-info__cost-value`).textContent = fullPrice;
}
