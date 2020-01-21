import AbstractComponent from './abstract-component.js';

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

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}
