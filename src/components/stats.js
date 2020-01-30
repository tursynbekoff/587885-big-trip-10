import AbstractSmartComponent from './abstract-smart-component.js';
import {Statistic, renderMoneyChart, renderTransportChart, renderTimeSpendChart} from '../utils/stats.js';

const createDiagramTemplate = (types) => {
  return Object.values(types).map((value) => (
    `<div class="statistics__item statistics__item--${value}">
    <canvas class="statistics__chart  statistics__chart--${value}" width="900"></canvas>
    </div>`
  )).join(`\n`);
};

const createStatsTemplate = () => {
  return (
    `<section class="statistics">
    <h2 class="">Trip statistics</h2>

    ${createDiagramTemplate(Statistic)}
  `);
};

export default class Stats extends AbstractSmartComponent {
  constructor(pointsModel) {
    super();

    this._pointsModel = pointsModel;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return createStatsTemplate();
  }

  show() {
    super.show();
    this.rerender();
  }

  _renderCharts() {
    const element = this.getElement();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = element.querySelector(`.statistics__chart--time-spent`);

    this._resetCharts();
    // debugger;
    this._moneyChart = renderMoneyChart(moneyCtx, this._pointsModel.getPoints());
    this._transportChart = renderTransportChart(transportCtx, this._pointsModel.getPoints());
    this._timeSpendChart = renderTimeSpendChart(timeSpendCtx, this._pointsModel.getPoints());
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }
    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }
    if (this._timeSpendChart) {
      this._timeSpendChart.destroy();
      this._timeSpendChart = null;
    }
  }

  rerender() {
    // debugger;
    super.rerender();

    this._renderCharts();
  }

  recoveryListeners() {}
}
