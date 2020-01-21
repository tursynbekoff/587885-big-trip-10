import TripPointComponent from '../components/trip-point.js';
import NoPointComponent from '../components/no-trip-point.js';
import TripEditComponent from '../components/trip-edit.js';
import TripDayComponent from '../components/trip-days';
import SortingComponent from '../components/sorting.js';
import TripInfoComponent from '../components/trip-info';
import {RenderPosition, render, replace} from '../utils/render.js';


const renderTripPoints = (tripsListElement, tripPoint) => {

  const onEscKeyDown = (evt) => {
    const isEscKey = (evt.key === `Escape` || evt.key === `Esc`);
    if (isEscKey) {
      evt.preventDefault(); // don't close fullscreen on mac
      replace(tripPointComponent, tripEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replacePointToEdit = () => {
    replace(tripEditComponent, tripPointComponent);
  };

  const replaceEditToPoint = () => {
    replace(tripPointComponent, tripEditComponent);
  };

  const tripPointComponent = new TripPointComponent(tripPoint);
  const tripEditComponent = new TripEditComponent(tripPoint);

  tripPointComponent.setEditButtonHandler(() => {
    replacePointToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  tripEditComponent.setSubmitHandler(replaceEditToPoint);

  return render(tripsListElement, tripPointComponent, RenderPosition.BEFOREEND);
};

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._noPointComponent = new NoPointComponent();
    this._sortingComponent = new SortingComponent();
    this._tripInfoComponent = new TripInfoComponent();
  }

  render(tripDays) {
    const container = this._container.getElement();
    // let fullPrice = 0;
    if (tripDays.length === 0) {
      render(container, this._noPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortingComponent, RenderPosition.AFTERBEGIN);

    tripDays.forEach((day) => render(container, new TripDayComponent(day), RenderPosition.BEFOREEND));

    const tripsListElements = Array.from(container.querySelectorAll(`.trip-events__list`));

    tripDays.forEach((day, index) =>
      day.dayInfo.forEach((data) => {
        renderTripPoints(tripsListElements[index], data);
      })
    );
  }
}

