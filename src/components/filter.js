import {createElement} from '../utils.js';

const createFilterMarkup = (filter) => {
  const {name, isActive} = filter;

  return `<div class="trip-filters__filter">
            <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isActive ? `checked` : ``}>
            <label class="trip-filters__filter-label" for="filter-${name}">${name.charAt(0).toUpperCase() + name.slice(1)}</label>
          </div>`;
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => (createFilterMarkup(it))).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`);
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
