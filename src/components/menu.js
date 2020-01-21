import AbstractComponent from './abstract-component.js';

const createSiteMenuTemplate = (menu) => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            ${menu.map(({isActive, name}) => {
    return `<a class="trip-tabs__btn  ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${name}</a>`;
  }).join(``)}
  </nav>`;
};

export default class Menu extends AbstractComponent {
  constructor(menu) {
    super();
    this._menu = menu;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._menu);
  }
}
