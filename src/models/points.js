import moment from 'moment';
import {getPointsByFilter} from '../utils/filter.js';
import {sortPoints} from '../utils/common.js';
import {FilterType} from '../const.js';

export default class Points {
  constructor() {
    this._days = [];
    this._points = [];
    this._activeFilterType = FilterType.EVERYTHING;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getPoints() {
    return getPointsByFilter(this._points, this._activeFilterType);
  }

  getPointsAll() {
    return this._points;
  }

  getDays() {
    return this._days;
  }

  setPoints(points) {
    this._points = Array.from(sortPoints(points));
  }

  setDays() {
    const setOfDays = new Set();
    this.getPoints().forEach((it) => setOfDays.add(moment(new Date(it.startDate)).format(`YYYY/MM/DD`)));
    this._days = Array.from(setOfDays).map((it) => new Date(it)).sort((a, b) => a - b);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  removePoint(id) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), this._points.slice(index + 1));
    this.setDays();
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  updatePoint(id, point) {
    const index = this._points.findIndex((it) => it.id === id);
    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), point, this._points.slice(index + 1));
    this.setDays();

    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  addPoint(point) {
    this._points = [].concat(point, this._points);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
