import {createElement} from '../utils.js';

const createSiteMenuTemplate = (menu) => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            ${menu.map(({isActive, name}) => {
    return `<a class="trip-tabs__btn  ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${name}</a>`;
  }).join(``)}
  </nav>`;
};

export default class Menu {
  constructor(menu) {
    this._menu = menu;
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._menu);
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
