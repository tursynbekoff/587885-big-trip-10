import FilterController from './controllers/filter.js';
import SiteMenuComponent, {MenuItem} from './components/menu.js';
import StatsComponent from './components/stats.js';
import PointsModel from './models/points.js';
import BoardController from './controllers/trip-board.js';
import {RenderPosition, render} from './utils/render.js';
import TripInfoComponent from './components/trip-info';
import {createTripPoints} from './mock/trip-point';


const POINTS_NUMBER = 1;
const points = createTripPoints(POINTS_NUMBER);
const pointsModel = new PointsModel();
pointsModel.setPoints(points);
pointsModel.setDays();

const statsComponent = new StatsComponent(pointsModel);


const headerElement = document.querySelector(`.page-header`);
const controlElement = headerElement.querySelector(`.trip-controls`);

const siteMenuComponent = new SiteMenuComponent();
render(controlElement, siteMenuComponent, RenderPosition.BEFOREEND);
const filterController = new FilterController(controlElement, pointsModel);
filterController.render();
// render(controlElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const pageMainElement = document.querySelector(`.page-main`);
const tripMainElement = document.querySelector(`.trip-main`);

const tripInfoElement = headerElement.querySelector(`.trip-info`);
const tripInfoComponent = new TripInfoComponent(pointsModel);
render(tripInfoElement, tripInfoComponent, RenderPosition.AFTERBEGIN);

const tripBoard = pageMainElement.querySelector(`.trip-events`);
const boardController = new BoardController(tripBoard, pointsModel, tripInfoComponent);
statsComponent.hide();
boardController.render();
render(tripBoard, statsComponent, RenderPosition.BEFOREEND);

const buttonAddPoint = tripMainElement.querySelector(`.trip-main__event-add-btn`);
buttonAddPoint.addEventListener(`click`, () => {
  siteMenuComponent.setActiveItem(MenuItem.TABLE);
  statsComponent.hide();
  boardController.show();
  boardController.createPoint();
});

siteMenuComponent.setClickHandler((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      boardController.show();
      statsComponent.hide();
      siteMenuComponent.setActiveItem(MenuItem.TABLE);
      break;
    case MenuItem.STATS:
      boardController.hide();
      statsComponent.show();
      siteMenuComponent.setActiveItem(MenuItem.STATS);
      break;
  }
});

