import {createFilterTemplate} from './components/filter.js';
import {createSiteMenuTemplate} from './components/menu.js';
import {createTripInfoTemplate} from './components/trip-info';
import {createSortingTemplate} from './components/sorting.js';
import {createBoardTripTemplate} from './components/trip-board.js';
import {createDayMarkup} from './components/trip-point.js';
import {createOrEditTripTemplate} from './components/trip-edit.js';
import {createTripDaysTemplate} from './components/trip-days';

import {filters} from './mock/filter';
import {menu} from './mock/menu';
import {days} from './mock/trip-point';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.page-header`);

const tripInfoElement = headerElement.querySelector(`.trip-info`);
// render(tripInfoElement, createRouteInfoTemplate(), `afterbegin`);
render(tripInfoElement, createTripInfoTemplate(days), `afterbegin`);

const controlElement = headerElement.querySelector(`.trip-controls`);

render(controlElement, createSiteMenuTemplate(menu), `beforeend`);
render(controlElement, createFilterTemplate(filters), `beforeend`);

const mainElement = document.querySelector(`.page-main`);
const tripEventsElement = mainElement.querySelector(`.trip-events`);

render(tripEventsElement, createSortingTemplate(), `beforeend`);
render(tripEventsElement, createBoardTripTemplate(), `beforeend`);

const boardElement = tripEventsElement.querySelector(`.trip-days`);
render(boardElement, createOrEditTripTemplate(days), `beforeend`);


render(boardElement, createTripDaysTemplate(days), `beforeend`);

const tripsListElement = tripEventsElement.querySelector(`.trip-events__list`);

// days.forEach((day) => render(tripsListElement, createDayMarkup(day.dayInfo), `beforeend`));
// days[0].dayInfo.forEach((point) => render(tripsListElement, createDayMarkup(point), `beforeend`))
