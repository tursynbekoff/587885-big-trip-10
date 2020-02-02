import NoPointComponent from '../components/no-trip-point.js';
import TripDayComponent from '../components/day.js';
import DayBoardComponent from '../components/day-board.js';
import SortingComponent from '../components/sorting.js';
import {SortType} from '../const.js';
import TripInfoComponent from '../components/trip-info';
import {RenderPosition, render} from '../utils/render.js';
import PointController, {Mode as TripControllerMode, EmptyPoint} from './trip-point.js';
import moment from 'moment';
import {getFullDate} from '../utils/common.js';

const renderTripPoints = (tripsListElement, points, onDataChange, onViewChange) => {
  return points.map((data) => {
    const pointController = new PointController(tripsListElement, onDataChange, onViewChange);
    pointController.render(data, TripControllerMode.DEFAULT);
    return pointController;
  });
};

const renderSort = (container, sortingComponent, points) => {

  if (points.length > 0) {
    render(container, sortingComponent, RenderPosition.AFTERBEGIN);
  } else {
    sortingComponent.removeElement();
  }
};

const renderDays = (container, days, points, onDataChange, onViewChange) => {
  if (points.length === 0) {
    render(container, new NoPointComponent(), RenderPosition.BEFOREEND);
    return [];
  } else {
    container.innerHTML = ``;
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
      return renderTripPoints(dayComponent.getElement().querySelector(`.trip-events__list`), points, onDataChange, onViewChange);
    }
  }
};

export default class BoardController {
  constructor(container, pointsModel, tripInfoComponent, api) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._api = api;
    this._sortingComponent = new SortingComponent();
    this._tripInfoComponent = new TripInfoComponent();
    this._dayBoardComponent = new DayBoardComponent();
    this._creatingPoint = null;
    this._tripInfoComponent = tripInfoComponent;

    this._showedPointControllers = [];
    this._currentSortType = SortType.DEFAULT;

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
    this._renderPoints(points, days);
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    const editingController = this._showedPointControllers.find((it) => it.getMode() === TripControllerMode.EDIT);
    if (editingController) {
      editingController.exitEdit();
    }
    this._creatingPoint = new PointController(this._dayBoardComponent.getElement(), this._onDataChange, this._onViewChange);
    this._emptyPoint = EmptyPoint;

    this._creatingPoint.render(this._emptyPoint, TripControllerMode.ADDING);

  }

  _removePoints() {
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    this._showedPointControllers = [];
  }

  _removeCreatingPoint() {
    if (this._creatingPoint) {
      this._creatingPoint.destroy();
      this._creatingPoint = null;
    }
  }

  _renderPoints(points, days) {
    renderSort(this._container, this._sortingComponent, points);
    // ????
    const newPoints = renderDays(this._dayBoardComponent.getElement(), days, points, this._onDataChange, this._onViewChange);
    this._showedPointControllers = this._showedPointControllers.concat(newPoints);
    this._showedPointControllers.forEach((controller) => {
      controller.getPointComponent().setEditButtonHandler(this._removeCreatingPoint.bind(this));
    });

    this._tripInfoComponent.rerender();
  }

  _updatePoints() {
    this._removePoints();
    this._pointsModel.setDays();
    this._onSortTypeChange(this._currentSortType);
    this._tripInfoComponent.rerender();
  }

  _onSortTypeChange(sortType) {
    let sortedPoints = [];
    let sortedDays = [];

    switch (sortType) {
      case SortType.PRICE:
        sortedPoints = this._pointsModel.getPoints().slice().sort((a, b) => b.price - a.price);
        sortedDays = null;
        this._currentSortType = SortType.PRICE;
        break;
      case SortType.TIME:
        sortedPoints = this._pointsModel.getPoints().slice().sort((a, b) => (b.duration) - (a.duration));
        sortedDays = null;
        this._currentSortType = SortType.TIME;
        break;
      case SortType.DEFAULT:
        sortedPoints = this._pointsModel.getPoints();
        sortedDays = this._pointsModel.getDays();
        this._currentSortType = SortType.DEFAULT;
        break;
    }
    this._removeCreatingPoint();
    this._renderPoints(sortedPoints, sortedDays);
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === this._emptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
      } else {
        this._api.createPoint(newData)
        .then((pointModel) => {
          this._pointsModel.addPoint(pointModel);
          pointController.render(pointModel, TripControllerMode.DEFAULT);

          const destroyedPoint = this._showedPointControllers.pop();
          if (destroyedPoint) {
            destroyedPoint.destroy();
          }
          this._showedPointControllers = [].concat(pointController, this._showedPointControllers);
          this._tripInfoComponent.rerender();
          this._updatePoints();
        }).catch(() => {
          pointController.shake();
        });
      }
    } else if (newData === null) {
      this._api.deletePoint(oldData.id)
      .then(() => {
        this._pointsModel.removePoint(oldData.id);
        this._updatePoints();
      }).catch(() => {
        pointController.shake();
      });
    } else {
      this._api.updatePoint(oldData.id, newData)
      .then((pointModel) => {
        const isSuccess = this._pointsModel.updatePoint(oldData.id, pointModel);

        if (isSuccess) {
          if (getFullDate(oldData.startDate) === getFullDate(pointModel.startDate)) {
            pointController.render(pointModel, TripControllerMode.DEFAULT);
          }
          this._updatePoints();
        }
      })
      .catch(() => {
        pointController.shake();
      });
    }
  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._removePoints();
    this._pointsModel.setDays();
    this._onSortTypeChange(this._currentSortType);
  }
}

