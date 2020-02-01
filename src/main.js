import API from './api.js';
import FilterController from './controllers/filter.js';
import SiteMenuComponent, {MenuItem} from './components/menu.js';
import StatsComponent from './components/stats.js';
import PointsModel from './models/points.js';
import BoardController from './controllers/trip-board.js';
import {RenderPosition, render} from './utils/render.js';
import TripInfoComponent from './components/trip-info';
// import {createTripPoints} from './mock/trip-point';

const AUTHORIZATION = `Basic eo0w590ik29889a`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip`;
const api = new API(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel();

const headerElement = document.querySelector(`.page-header`);
const controlElement = headerElement.querySelector(`.trip-controls`);

const statsComponent = new StatsComponent(pointsModel);
const siteMenuComponent = new SiteMenuComponent();
render(controlElement, siteMenuComponent, RenderPosition.BEFOREEND);
const filterController = new FilterController(controlElement, pointsModel);
filterController.render();

const pageMainElement = document.querySelector(`.page-main`);
const tripMainElement = document.querySelector(`.trip-main`);

const tripInfoElement = headerElement.querySelector(`.trip-info`);
const tripInfoComponent = new TripInfoComponent(pointsModel);
render(tripInfoElement, tripInfoComponent, RenderPosition.AFTERBEGIN);

const tripBoardElement = pageMainElement.querySelector(`.trip-events`);
const boardController = new BoardController(tripBoardElement, pointsModel, tripInfoComponent);
statsComponent.hide();
render(tripBoardElement, statsComponent, RenderPosition.BEFOREEND);

const buttonAddPoint = tripMainElement.querySelector(`.trip-main__event-add-btn`);
buttonAddPoint.addEventListener(`click`, () => {
  siteMenuComponent.setActiveItem(MenuItem.TABLE);
  statsComponent.hide();
  boardController.show();
  filterController.show();
  boardController.createPoint();
});
// debugger;
export const tripDestinations = [];
api.getDestinations()
  .then((destinations) => {
    destinations.map((it) => tripDestinations.push(it));
    return tripDestinations;
  });

export const tripOffers = [];
api.getOffers()
    .then((offers) => {
      offers.map((it) => tripOffers.push(it));
      return tripOffers;
    });

api.getPoints()
.then((points) => {
  pointsModel.setPoints(points);
  pointsModel.setDays();
  boardController.render();
});

siteMenuComponent.setClickHandler((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      boardController.show();
      filterController.show();
      statsComponent.hide();
      siteMenuComponent.setActiveItem(MenuItem.TABLE);
      break;
    case MenuItem.STATS:
      boardController.hide();
      filterController.hide();
      statsComponent.show();
      siteMenuComponent.setActiveItem(MenuItem.STATS);
      break;
  }
});

// api.getDestinations()
// .then((points) => {
//   pointsModel.setPoints(points);
//   pointsModel.setDays();
//   boardController.render();
// });
