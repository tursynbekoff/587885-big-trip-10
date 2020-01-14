export const createSiteMenuTemplate = (menu) => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            ${menu.map(({isActive, name}) => {
    return `<a class="trip-tabs__btn  ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${name}</a>`;
  }).join(``)}
  </nav>`;
};
