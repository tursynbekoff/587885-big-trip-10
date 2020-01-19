import FilterComponent from './components/filter.js';
import SiteMenuComponent from './components/menu.js';
import TripInfoComponent from './components/trip-info';
import SortingComponent from './components/sorting.js';
import TripBoardComponent from './components/trip-board.js';
import TripPointComponent from './components/trip-point.js';
import NoPointComponent from './components/no-trip-point.js';
import TripEditComponent from './components/trip-edit.js';
import TripDayComponent from './components/trip-days';
import {RenderPosition, render} from './utils.js';

import {filters} from './mock/filter';
import {menu} from './mock/menu';
import {days} from './mock/trip-point';
// const days = [];

const renderTripPoints = (tripsListElement, tripPoint) => {

  const onEscKeyDown = (evt) => {
    const isEscKey = (evt.key === `Escape` || evt.key === `Esc`);
    if (isEscKey) {
      evt.preventDefault(); // don't close fullscreen on mac
      replaceTwoElements(tripsListElement, tripPointComponent.getElement(), tripEditComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceTwoElements = (container, newElement, oldElement) => {
    return container.replaceChild(newElement, oldElement);
  };

  const tripPointComponent = new TripPointComponent(tripPoint);
  const tripEditComponent = new TripEditComponent(tripPoint);

  const editButton = tripPointComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    replaceTwoElements(tripsListElement, tripEditComponent.getElement(), tripPointComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const saveButton = tripEditComponent.getElement().querySelector(`form`);
  saveButton.addEventListener(`submit`, () => {
    replaceTwoElements(tripsListElement, tripPointComponent.getElement(), tripEditComponent.getElement());
  });

  return render(tripsListElement, tripPointComponent.getElement(), RenderPosition.BEFOREEND);
};

const headerElement = document.querySelector(`.page-header`);

const controlElement = headerElement.querySelector(`.trip-controls`);

render(controlElement, new SiteMenuComponent(menu).getElement(), RenderPosition.BEFOREEND);
render(controlElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const mainElement = document.querySelector(`.page-main`);
const tripEventsElement = mainElement.querySelector(`.trip-events`);

render(tripEventsElement, new TripBoardComponent().getElement(), RenderPosition.BEFOREEND);


const boardElement = tripEventsElement.querySelector(`.trip-days`);


let fullPrice = 0;
if (days.length === 0) {
  render(boardElement, new NoPointComponent().getElement(), RenderPosition.BEFOREEND);
} else {
  const tripInfoElement = headerElement.querySelector(`.trip-info`);
  render(tripInfoElement, new TripInfoComponent(days).getElement(), RenderPosition.AFTERBEGIN);
  render(tripEventsElement, new SortingComponent().getElement(), RenderPosition.AFTERBEGIN);

  days.forEach((day) => render(boardElement, new TripDayComponent(day).getElement(), RenderPosition.BEFOREEND));


  const tripsListElements = Array.from(tripEventsElement.querySelectorAll(`.trip-events__list`));

  days.forEach((day, index) =>
    day.dayInfo.forEach((data) => {
      renderTripPoints(tripsListElements[index], data);
    })
  );

  fullPrice = days.flatMap((day) => day.dayInfo).reduce((price, point) => price + point.price, 0);
}

document.querySelector(`.trip-info__cost-value`).textContent = fullPrice;

