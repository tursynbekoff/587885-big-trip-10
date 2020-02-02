import TripPointComponent from '../components/trip-point.js';
import TripEditComponent from '../components/trip-edit.js';
import {RenderPosition, render, replace, remove} from '../utils/render.js';
import {MS_PER_SECONDS, DefaultDataButton} from '../const.js';

const SHAKE_ANIMATION_TIMEOUT = 600;

const AnimationButtonText = {
  SAVING: `Saving...`,
  DELETING: `Deleting...`,
};

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyPoint = {
  id: ``,
  type: `bus`,
  destination: {
    name: ``,
    description: ``,
  },
  img: ``,
  description: ``,
  price: 0,
  offers: [],
  startDate: new Date(),
  endDate: new Date(),
  isFavorite: false,
  duration: 0,
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
    this.exitEdit = this.exitEdit.bind(this);
  }

  render(tripPoint, mode) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;
    this._mode = mode;

    this._createPointComponent(tripPoint);
    this._pointEditComponent = new TripEditComponent(tripPoint);

    this._pointEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._pointEditComponent.setData({
        SAVE_BUTTON_TEXT: AnimationButtonText.SAVING,
      });

      const data = this._pointEditComponent.getData();

      this._onDataChange(this, tripPoint, data);
    });

    this._pointEditComponent.setDeleteButtonClickHandler(() => {
      this._pointEditComponent.setData({
        DELETE_BUTTON_TEXT: AnimationButtonText.DELETING,
      });

      this._onDataChange(this, tripPoint, null);
    });

    this._pointEditComponent.setCloseButtonClickHandler(this.exitEdit);

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

  getPointComponent() {
    return this._pointComponent;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  destroy() {
    remove(this._pointEditComponent);
    remove(this._pointComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  getMode() {
    return this._mode;
  }

  shake() {
    this._pointEditComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / MS_PER_SECONDS}s`;
    this._pointComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / MS_PER_SECONDS}s`;

    setTimeout(() => {
      this._pointEditComponent.getElement().style.animation = ``;
      this._pointComponent.getElement().style.animation = ``;

      this._pointEditComponent.setData({
        SAVE_BUTTON_TEXT: DefaultDataButton.SAVE_BUTTON_TEXT,
        DELETE_BUTTON_TEXT: DefaultDataButton.DELETE_BUTTON_TEXT,
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  exitEdit() {
    if (this._mode === Mode.ADDING) {
      this._onDataChange(this, EmptyPoint, null);
    } else {
      this._replaceEditToPoint();
    }
    document.removeEventListener(`keydown`, this._onEscKeyDown);
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
    if (document.contains(this._pointEditComponent.getElement())) {
      replace(this._pointComponent, this._pointEditComponent);
    }
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
      this.exitEdit();
    }
  }
}
