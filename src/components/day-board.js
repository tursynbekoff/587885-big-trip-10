import AbstractComponent from './abstract-component.js';

const createBoardTripTemplate = () => {
  return `<ul class="trip-days">
  </ul>`;
};

export default class DaysBoard extends AbstractComponent {
  getTemplate() {
    return createBoardTripTemplate();
  }
}
