import TripPointComponent from '../components/trip-point.js';
import TripEditComponent from '../components/trip-edit.js';
import {RenderPosition, render, replace, remove} from '../utils/render.js';
// import {getOffers, getDescriptions} from '../utils/common.js';
// import {OFFERS, DESCRIPTIONS} from '../mock/trip-point.js';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const getEmptyPoint = (startDate) => {
  return {
    id: String(new Date() + Math.random()),
    type: `Bus`,
    destination: {
      name: ``,
      description: ``,
    },
    img: ``,
    description: ``,
    price: ``,
    offers: [],
    startDate,
    endDate: startDate,
    isFavorite: false,
    duration: `0`,
  };
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(tripPoint, mode) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;
    this._mode = mode;

    if (this._mode !== Mode.EDIT) {
      this._createPointComponent(tripPoint);

      //   if (oldPointComponent) {
      //     replace(this._pointComponent, oldPointComponent);
      //   } else {
      //     render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
      //   }
      // }

      this._pointEditComponent = new TripEditComponent(tripPoint);

      this._pointEditComponent.setSubmitHandler((evt) => {
        evt.preventDefault();
        const data = this._pointEditComponent.getData();
        // this._replaceEditToPoint();
        this._onDataChange(this, tripPoint, data);
      });

      // if (oldPointEditComponent) {
      //   replace(this._pointEditComponent, oldPointEditComponent);
      // }
      this._pointEditComponent.setDeleteButtonClickHandler(() => {
        this._onDataChange(this, tripPoint, null);
      });

      switch (mode) {
        case Mode.DEFAULT:
          if (oldPointEditComponent && oldPointComponent) {
            replace(this._pointComponent, oldPointComponent);
            replace(this._pointEditComponent, oldPointEditComponent);
            this._replaceEditToPoint();
          } else {
            render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
          }
          break;
        case Mode.ADDING:
          if (oldPointEditComponent && oldPointComponent) {
            remove(oldPointComponent);
            remove(oldPointEditComponent);
          }
          document.addEventListener(`keydown`, this._onEscKeyDown);
          render(this._container, this._pointEditComponent, RenderPosition.AFTERBEGIN);
          break;
      }
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  _createPointComponent(tripPoint) {
    this._pointComponent = new TripPointComponent(tripPoint);

    this._pointComponent.setEditButtonHandler(() => {
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });
  }

  destroy() {
    remove(this._pointEditComponent);
    remove(this._pointComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEditToPoint() {
    this._pointEditComponent.reset();

    replace(this._pointComponent, this._pointEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _replacePointToEdit() {
    this._onViewChange();

    replace(this._pointEditComponent, this._pointComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      evt.preventDefault();
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, getEmptyPoint(Date.now()), null);
      }
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
