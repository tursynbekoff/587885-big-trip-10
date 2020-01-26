import NoPointComponent from '../components/no-trip-point.js';
import TripDayComponent from '../components/trip-days';
import SortingComponent, {SortType} from '../components/sorting.js';
import TripInfoComponent from '../components/trip-info';
import {RenderPosition, render} from '../utils/render.js';
import {days} from '../mock/trip-point.js';
import PointController from './trip-point';

const renderTripPoints = (tripsListElements, daysTrip, onDataChange, onViewChange) => {
  return daysTrip.flatMap((day, index) =>
    day.dayInfo.map((data) => {
      const pointController = new PointController(tripsListElements[index], onDataChange, onViewChange);
      pointController.render(data);
      return pointController;
    })
  );
};

const renderSortAndDays = (container, sortingComponent, daysTrip, onDataChange, onViewChange) => {
  render(container, sortingComponent, RenderPosition.AFTERBEGIN);

  daysTrip.forEach((day) => render(container, new TripDayComponent(day), RenderPosition.BEFOREEND));

  const tripsListElements = Array.from(container.querySelectorAll(`.trip-events__list`));

  return renderTripPoints(tripsListElements, daysTrip, onDataChange, onViewChange);
};

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._days = [];
    this._noPointComponent = new NoPointComponent();
    this._sortingComponent = new SortingComponent();
    this._tripInfoComponent = new TripInfoComponent();

    this._showedTaskControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tripDays) {
    this._days = tripDays;
    const container = this._container.getElement();
    if (this._days.length === 0) {
      render(container, this._noPointComponent, RenderPosition.BEFOREEND);
      return;
    }
    this._showedTaskControllers = renderSortAndDays(container, this._sortingComponent, days, this._onDataChange, this._onViewChange);
  }

  _onSortTypeChange(sortType) {
    let sortedTripPoints = [];
    let sortedDays = [];

    let arrayOfTripPoints = this._days.flatMap((day) => day.dayInfo);

    this._container.getElement().innerHTML = ``;

    switch (sortType) {
      case SortType.PRICE:
        sortedTripPoints = arrayOfTripPoints.slice().sort((a, b) => b.price - a.price);
        sortedDays.push({dayInfo: sortedTripPoints});
        break;
      case SortType.TIME:
        sortedTripPoints = arrayOfTripPoints.slice().sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));
        sortedDays.push({dayInfo: sortedTripPoints});
        break;
      case SortType.DEFAULT:
        sortedDays = this._days;
    }
    this._showedTaskControllers = renderSortAndDays(this._container.getElement(), this._sortingComponent, sortedDays, this._onDataChange, this._onViewChange);
  }

  _onDataChange(pointController, oldData, newData) {
    // debugger;
    let indexPoint;
    let indexDay;
    for (indexDay = 0; indexDay < this._days.length; indexDay++) {
      indexPoint = this._days[indexDay].dayInfo.findIndex((it) => it === oldData);
      if (indexPoint !== -1) {
        break;
      }
    }

    this._days[indexDay].dayInfo[indexPoint] = newData;

    pointController.render(this._days[indexDay].dayInfo[indexPoint]);
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }
}

