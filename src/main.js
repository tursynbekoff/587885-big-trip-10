// import FilterComponent from './components/filter.js';
import FilterController from './controllers/filter.js';
import SiteMenuComponent from './components/menu.js';
// import DayBoardComponent from './components/day-board.js/index.js';
import PointsModel from './models/points.js';
import BoardController from './controllers/trip-board.js';
import {RenderPosition, render} from './utils/render.js';
import TripInfoComponent from './components/trip-info';
// import {filters} from './mock/filter';
import {menu} from './mock/menu';
import {createTripPoints} from './mock/trip-point';
// const days = [];
const POINTS_NUMBER = 10;
const points = createTripPoints(POINTS_NUMBER);
const pointsModel = new PointsModel();
pointsModel.setPoints(points);
pointsModel.setDays();


const headerElement = document.querySelector(`.page-header`);
const controlElement = headerElement.querySelector(`.trip-controls`);

render(controlElement, new SiteMenuComponent(menu), RenderPosition.BEFOREEND);
const filterController = new FilterController(controlElement, pointsModel);
filterController.render();
// render(controlElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const pageMainElement = document.querySelector(`.page-main`);
const tripMainElement = document.querySelector(`.trip-main`);

const tripInfoElement = headerElement.querySelector(`.trip-info`);
render(tripInfoElement, new TripInfoComponent(points), RenderPosition.AFTERBEGIN);

const tripBoard = pageMainElement.querySelector(`.trip-events`);
const boardController = new BoardController(tripBoard, pointsModel);
boardController.render();

const buttonAddPoint = tripMainElement.querySelector(`.trip-main__event-add-btn`);
buttonAddPoint.addEventListener(`click`, () => {
  boardController.createPoint();
});


