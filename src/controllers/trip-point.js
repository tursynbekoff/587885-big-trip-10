import TripPointComponent from '../components/trip-point.js';
import TripEditComponent from '../components/trip-edit.js';
import {RenderPosition, render, replace} from '../utils/render.js';
// import {getOffers, getDescriptions} from '../utils/common.js';
// import {OFFERS, DESCRIPTIONS} from '../mock/trip-point.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
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

  render(tripPoint) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;

    if (this._mode !== Mode.EDIT) {
      this._createPointComponent(tripPoint);

      if (oldPointComponent) {
        replace(this._pointComponent, oldPointComponent);
      } else {
        render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
      }
    }

    this._pointEditComponent = new TripEditComponent(tripPoint);

    // this._pointEditComponent.setFavoritesButtonClickHandler(() => {
    //   this._onDataChange(this, tripPoint, Object.assign({}, tripPoint, {
    //     isFavorite: !tripPoint.isFavorite,
    //   }));
    // });

    // this._pointEditComponent.setTypeChangeHandler((evt) => {
    //   this._onDataChange(this, tripPoint, Object.assign({}, tripPoint, {
    //     type: (evt.target.value).charAt(0).toUpperCase() + (evt.target.value).slice(1),
    //     offers: getOffers(OFFERS),
    //   }));
    // });

    // this._pointEditComponent.setCityChangeHandler((evt) => {
    //   this._onDataChange(this, tripPoint, Object.assign({}, tripPoint, {
    //     destination: (evt.target.value).charAt(0).toUpperCase() + (evt.target.value).slice(1),
    //     description: getDescriptions(DESCRIPTIONS),
    //   }));
    // });

    this._pointEditComponent.setSubmitHandler(() => {
      // debugger;
      // evt.preventDefault();
      this._createPointComponent(tripPoint);
      this._replaceEditToPoint();
    });

    if (oldPointEditComponent) {
      replace(this._pointEditComponent, oldPointEditComponent);
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
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
