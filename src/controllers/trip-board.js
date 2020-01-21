import TripPointComponent from '../components/trip-point.js';
import NoPointComponent from '../components/no-trip-point.js';
import TripEditComponent from '../components/trip-edit.js';
import TripDayComponent from '../components/trip-days';
import SortingComponent, {SortType} from '../components/sorting.js';
import TripInfoComponent from '../components/trip-info';
import {RenderPosition, render, replace} from '../utils/render.js';
import { days } from '../mock/trip-point.js';


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
    if (tripDays.length === 0) {
      render(container, this._noPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    this._sortingComponent.setSortTypeChangeHandler((sortType) => {
      let sortedTripPoints = [];
      let sortedDays = [];
      // for (let i = 0; i < tripDays.length; i++) {
      //   for (let j = 0; j < tripDays.dayInfo.length; j++) {
      //     arrayOfTripPoints.push(tripDays[i].dayInfo[j]);
      //   }
      // }

      let arrayOfTripPoints = tripDays.flatMap((day) => day.dayInfo);

      container.innerHTML = ``;

      switch (sortType) {
        case SortType.PRICE:
          sortedTripPoints = arrayOfTripPoints.slice().sort((a, b) => b.price - a.price);
          sortedDays.push({dayInfo: sortedTripPoints});
          break;
        case SortType.TIME:
          sortedTripPoints = arrayOfTripPoints.slice().sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));
          sortedDays.push({dayInfo: sortedTripPoints});
          break;
        case SortType.DEFAULT:
          sortedDays = tripDays;
      }

      render(container, this._sortingComponent, RenderPosition.AFTERBEGIN);

      sortedDays.forEach((day) => render(container, new TripDayComponent(day), RenderPosition.BEFOREEND));

      const tripsListElements = Array.from(container.querySelectorAll(`.trip-events__list`));

      sortedDays.forEach((day, index) =>
        day.dayInfo.forEach((data) => {
          renderTripPoints(tripsListElements[index], data);
        })
      );
    });

    render(container, this._sortingComponent, RenderPosition.AFTERBEGIN);

    days.forEach((day) => render(container, new TripDayComponent(day), RenderPosition.BEFOREEND));

    const tripsListElements = Array.from(container.querySelectorAll(`.trip-events__list`));

    days.forEach((day, index) =>
      day.dayInfo.forEach((data) => {
        renderTripPoints(tripsListElements[index], data);
      })
    );
  }
}

