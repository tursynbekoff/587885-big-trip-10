import {createFilterTemplate} from './components/filter.js';
import {createSiteMenuTemplate} from './components/menu.js';
import {createRouteInfoTemplate} from './components/route-info.js';
import {createSortingTemplate} from './components/sorting.js';
import {createBoardTripTemplate} from './components/trip-board.js';
import {createDayTripTemplate} from './components/trip-day.js';
import {createOrEditTripTemplate} from './components/trip-edit.js';

const DAYS_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.page-header`);
const tripInfoElement = headerElement.querySelector(`.trip-info`);

render(tripInfoElement, createRouteInfoTemplate(), `afterbegin`);

const controlElement = headerElement.querySelector(`.trip-controls`);

render(controlElement, createSiteMenuTemplate(), `beforeend`);
render(controlElement, createFilterTemplate(), `beforeend`);

const mainElement = document.querySelector(`.page-main`);
const tripEventsElement = mainElement.querySelector(`.trip-events`);

render(tripEventsElement, createSortingTemplate(), `beforeend`);
render(tripEventsElement, createBoardTripTemplate(), `beforeend`);

const boardElement = tripEventsElement.querySelector(`.trip-days`);

render(boardElement, createOrEditTripTemplate(), `beforeend`);

new Array(DAYS_COUNT).fill(``).forEach(() => render(boardElement, createDayTripTemplate(), `beforeend`));
