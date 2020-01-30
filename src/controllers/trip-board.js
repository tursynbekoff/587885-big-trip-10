import NoPointComponent from '../components/no-trip-point.js';
import TripDayComponent from '../components/day.js';
import DayBoardComponent from '../components/day-board.js';
import SortingComponent, {SortType} from '../components/sorting.js';
import TripInfoComponent from '../components/trip-info';
import {RenderPosition, render} from '../utils/render.js';
// import {days} from '../mock/trip-point.js';
import PointController, {Mode as TripControllerMode, getEmptyPoint} from './trip-point';
import moment from 'moment';
import {getFullDate} from '../utils/common.js';

// import DayBoardComponent from './components/day-board.js/index.js';

// const dayBoardComponent = new DayBoardComponent();
// render(tripEventsElement, dayBoardComponent, RenderPosition.BEFOREEND);

const renderTripPoints = (tripsListElement, points, onDataChange, onViewChange) => {
  return points.map((data) => {
    const pointController = new PointController(tripsListElement, onDataChange, onViewChange);
    pointController.render(data, TripControllerMode.DEFAULT);
    // debugger;
    return pointController;
  });
};

const renderSort = (container, sortingComponent, points) => {
  if (points.length > 0) {
    render(container, sortingComponent, RenderPosition.AFTERBEGIN);
  }
};

const renderDays = (container, days, points, onDataChange, onViewChange) => {
  if (points.length === 0) {
    return render(container, new NoPointComponent(), RenderPosition.BEFOREEND);
  } else {
    // render(container, sortingComponent, RenderPosition.AFTERBEGIN);
    if (days) {
      return days.flatMap((day, index) => {
        const dayComponent = new TripDayComponent(day, index + 1);
        render(container, dayComponent, RenderPosition.BEFOREEND);
        return renderTripPoints(
            dayComponent.getElement().querySelector(`.trip-events__list`),
            points.filter((it) => moment(it.startDate).format(`YYYY/MM/DD`) === moment(day).format(`YYYY/MM/DD`)),
            onDataChange, onViewChange
        );
      });
    } else {
      const dayComponent = new TripDayComponent();
      render(container, dayComponent, RenderPosition.BEFOREEND);
      // debugger;
      return renderTripPoints(dayComponent.getElement().querySelector(`.trip-events__list`), points, onDataChange, onViewChange);
    }
  }
};

// const tripsListElements = Array.from(container.querySelectorAll(`.trip-events__list`));
// return renderTripPoints(tripsListElements, points, onDataChange, onViewChange);


export default class BoardController {
  constructor(container, pointsModel) {
    this._container = container;
    // this._points = points;
    // this._days = days;
    this._pointsModel = pointsModel;
    // this._noPointComponent = new NoPointComponent();
    this._sortingComponent = new SortingComponent();
    this._tripInfoComponent = new TripInfoComponent();
    this._dayBoardComponent = new DayBoardComponent();
    this._creatingPoint = null;

    this._showedPointControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._emptyPoint = null;

    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._sortingComponent.hide();
    this._dayBoardComponent.hide();
  }

  show() {
    this._sortingComponent.show();
    this._dayBoardComponent.show();
  }

  render() {
    const container = this._container;
    const points = this._pointsModel.getPoints();
    const days = this._pointsModel.getDays();

    renderSort(container, this._sortingComponent, points);

    render(container, this._dayBoardComponent, RenderPosition.BEFOREEND);
    this._showedPointControllers = renderDays(this._dayBoardComponent.getElement(), days, points, this._onDataChange, this._onViewChange);
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    this._creatingPoint = new PointController(this._dayBoardComponent.getElement(), this._onDataChange, this._onViewChange);
    this._emptyPoint = getEmptyPoint(this._pointsModel.getDays()[0] || Date.now());

    this._creatingPoint.render(this._emptyPoint, TripControllerMode.ADDING);


  }

  _removePoints() {
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    this._showedPointControllers = [];
    this._dayBoardComponent.getElement().innerHTML = ``;
  }

  _renderPoints(points, days) {
    // renderSort(this._container, this._sortingComponent, points);x
    const newPoints = renderDays(this._dayBoardComponent.getElement(), days, points, this._onDataChange, this._onViewChange);
    this._showedPointControllers = this._showedPointControllers.concat(newPoints);
  }

  _updatePoints() {
    this._removePoints();
    this._pointsModel.setDays();
    this._renderPoints(this._pointsModel.getPoints(), this._pointsModel.getDays());

  }

  _onSortTypeChange(sortType) {
    let sortedPoints = [];
    let sortedDays = [];

    // let arrayOfTripPoints = this._days.flatMap((day) => day.dayInfo);
    // debugger;
    this._dayBoardComponent.getElement().innerHTML = ``;

    switch (sortType) {
      case SortType.PRICE:
        sortedPoints = this._pointsModel.getPoints().slice().sort((a, b) => b.price - a.price);
        sortedDays = null;

        break;
      case SortType.TIME:
        sortedPoints = this._pointsModel.getPoints().slice().sort((a, b) => (b.duration) - (a.duration));
        sortedDays = null;
        // debugger;
        break;
      case SortType.DEFAULT:
        sortedPoints = this._pointsModel.getPoints();
        sortedDays = this._pointsModel.getDays();

    }
    renderSort(this._container, this._sortingComponent, sortedPoints);
    this._showedPointControllers = renderDays(this._dayBoardComponent.getElement(), sortedDays, sortedPoints, this._onDataChange, this._onViewChange);
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === this._emptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._pointsModel.addPoint(newData);
        pointController.render(newData, TripControllerMode.DEFAULT);

        const destroyedPoint = this._showedPointControllers.pop();
        destroyedPoint.destroy();
        this._showedPointControllers = [].concat(pointController, this._showedPointControllers);
        this._dayBoardComponent.getElement().innerHTML = ``;
        // renderSort(this._container, this._sortingComponent, this._pointsModel.getPoints());
        renderDays(this._dayBoardComponent.getElement(), this._pointsModel.getDays(), this._pointsModel.getPoints(), this._onDataChange, this._onViewChange);
      }
    } else if (newData === null) {
      this._pointsModel.removePoint(oldData.id);
      this._dayBoardComponent.getElement().innerHTML = ``;
      // renderSort(this._container, this._sortingComponent, this._pointsModel.getPoints());
      renderDays(this._dayBoardComponent.getElement(), this._pointsModel.getDays(), this._pointsModel.getPoints(), this._onDataChange, this._onViewChange);
    } else {
      const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);
      if (isSuccess) {
        if (getFullDate(oldData.startDate) === getFullDate(newData.startDate)) {
          pointController.render(newData, TripControllerMode.DEFAULT);
        } else {
          this._dayBoardComponent.getElement().innerHTML = ``;
          renderSort(this._container, this._sortingComponent, this._pointsModel.getPoints());
          renderDays(this._dayBoardComponent.getElement(), this._pointsModel.getDays(), this._pointsModel.getPoints(), this._onDataChange, this._onViewChange);
        }
      }
    }
  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    // debugger;
    // this._removePoints();
    // this._renderPoints(this._pointsModel.getPoints(), this._pointsModel.getDays());
    // debugger;
    this._updatePoints();
  }
}

