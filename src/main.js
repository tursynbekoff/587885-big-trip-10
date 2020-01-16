import FilterComponent from './components/filter.js';
import SiteMenuComponent from './components/menu.js';
import TripInfoComponent from './components/trip-info';
import SortingComponent from './components/sorting.js';
import TripBoardComponent from './components/trip-board.js';
import TripPointComponent from './components/trip-point.js';
import TripEditComponent from './components/trip-edit.js';
import TripDayComponent from './components/trip-days';
import {RenderPosition, render} from './utils.js';

import {filters} from './mock/filter';
import {menu} from './mock/menu';
import {days} from './mock/trip-point';

const headerElement = document.querySelector(`.page-header`);

const tripInfoElement = headerElement.querySelector(`.trip-info`);
render(tripInfoElement, new TripInfoComponent(days).getElement(), RenderPosition.AFTERBEGIN);

const controlElement = headerElement.querySelector(`.trip-controls`);

render(controlElement, new SiteMenuComponent(menu).getElement(), RenderPosition.BEFOREEND);
render(controlElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const mainElement = document.querySelector(`.page-main`);
const tripEventsElement = mainElement.querySelector(`.trip-events`);

render(tripEventsElement, new SortingComponent().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new TripBoardComponent().getElement(), RenderPosition.BEFOREEND);

const boardElement = tripEventsElement.querySelector(`.trip-days`);
render(boardElement, new TripEditComponent().getElement(), RenderPosition.BEFOREEND);

days.forEach((day) => render(boardElement, new TripDayComponent(day).getElement(), RenderPosition.BEFOREEND));

const tripsListElements = Array.from(tripEventsElement.querySelectorAll(`.trip-events__list`));

days.forEach((day, index) =>
  day.dayInfo.forEach((data) => {
    render(tripsListElements[index], new TripPointComponent(data).getElement(), RenderPosition.BEFOREEND)
  })
);

const fullPrice = days.flatMap((day) => day.dayInfo).reduce((price, point) => price + point.price, 0);
document.querySelector(`.trip-info__cost-value`).textContent = fullPrice;

