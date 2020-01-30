import AbstractComponent from './abstract-component.js';

const ACTIVE_CLASS = `trip-tabs__btn--active`;

export const MenuItem = {
  TABLE: `trip-tabs-btn-table`,
  STATS: `trip-tabs-btn-stats`,
};

const MenuItemArray = [`trip-tabs-btn-table`, `trip-tabs-btn-stats`];

const createSiteMenuTemplate = () => {
  // return `<nav class="trip-controls__trip-tabs  trip-tabs">
  //           ${menu.map(({isActive, name}) => {
  //   return `<a class="trip-tabs__btn  ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${name}</a>`;
  // }).join(``)}
  // </nav>`;
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn trip-tabs__btn--active" id="trip-tabs-btn-table" href="#">Table</a>
    <a class="trip-tabs__btn" id="trip-tabs-btn-stats" href="#">Stats</a>
  </nav>`
  );
};

export default class Menu extends AbstractComponent {

  getTemplate() {
    return createSiteMenuTemplate();
  }

  setActiveItem(menuItem) {
    // const activeItem = this.getElement().querySelector(`.${menuItem}`);
    // const inactiveItem = this.getElement().querySelector(`.${MenuItemArray[MenuItemArray.findIndex((it) => it !== menuItem)]}`);
    this.getElement().querySelector(`#${menuItem}`).classList.add(ACTIVE_CLASS);
    this.getElement().querySelector(`#${MenuItemArray[MenuItemArray.findIndex((it) => it !== menuItem)]}`).classList.remove(ACTIVE_CLASS);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }
      const menuItem = evt.target.id;
      handler(menuItem);
    });
  }
}
