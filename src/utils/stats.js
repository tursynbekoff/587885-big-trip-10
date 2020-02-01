
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from "moment";
import {ROUTE_TYPES} from '../const.js';

const TYPE_TRANSPORT_BEGINNING = 3;

const EURO = `\u20AC`;

export const Statistic = {
  MONEY: `money`,
  TRANSPORT: `transport`,
  TIME_SPEND: `time-spent`,
};

class DefaultChartConfig {
  static getDefaultChart() {
    return {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        datasets: [{
          backgroundColor: `white`,
        }]
      },
      options: {
        title: {
          display: true,
          position: `left`,
          fontSize: 22,
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              callback() {
                return ``;
              },
              min: 0,
            },
          }],
          yAxes: [{
            gridLines: {
              display: false,
            },
            tick: false,
          }],
        },
        plugins: {
          datalabels: {
            align: `start`,
            anchor: `end`,
          }
        },
      },
    };
  }
}

const getPointsTimeSpendByType = (points) => {
  const pointsTimeSpendByType = new Map();
  const getDurationInHours = (point) => moment.duration(point.duration).asHours();

  points.forEach((it) => {
    if (!pointsTimeSpendByType.has(it.type)) {
      pointsTimeSpendByType.set(it.type, getDurationInHours(it));
    } else {
      pointsTimeSpendByType.set(it.type, pointsTimeSpendByType.get(it.type) + getDurationInHours(it));
    }
  });
  return pointsTimeSpendByType;
};

const getPointsPriceByType = (points) => {
  const pointsPriceByType = new Map();

  points.forEach((it) => {
    if (!pointsPriceByType.has(it.type)) {
      pointsPriceByType.set(it.type, it.price);
    } else {
      pointsPriceByType.set(it.type, pointsPriceByType.get(it.type) + it.price);
    }
  });
  return pointsPriceByType;
};

const getPointsCountByType = (points) => {
  const typeTransport = ROUTE_TYPES.slice(TYPE_TRANSPORT_BEGINNING);
  const pointsCountByType = new Map();

  points.forEach((it) => {
    if (!typeTransport.includes(it.type)) {
      return;
    }
    if (!pointsCountByType.has(it.type)) {
      pointsCountByType.set(it.type, 1);
    } else {
      pointsCountByType.set(it.type, pointsCountByType.get(it.type) + 1);
    }
  });
  return pointsCountByType;
};

const getSortedKeysFromMap = (map) => Array.from(map.keys()).sort((a, b) => map.get(b) - map.get(a));

export const renderMoneyChart = (moneyCtx, points) => {
  const pointsPriceByType = getPointsPriceByType(points);

  const sortedPrice = getSortedKeysFromMap(pointsPriceByType);

  const chartConfig = DefaultChartConfig.getDefaultChart();
  chartConfig.data.labels = sortedPrice;
  chartConfig.data.datasets[0].data = sortedPrice.map((it) => pointsPriceByType.get(it));
  chartConfig.options.title.text = Statistic.MONEY.toUpperCase();
  chartConfig.options.plugins.datalabels.formatter = (it) => `${it}${EURO}`;

  return new Chart(moneyCtx, chartConfig);
};

export const renderTransportChart = (transportCtx, points) => {
  const pointsCountByType = getPointsCountByType(points);
  const sortedCount = getSortedKeysFromMap(pointsCountByType);

  const chartConfig = DefaultChartConfig.getDefaultChart();
  chartConfig.data.labels = sortedCount;
  chartConfig.data.datasets[0].data = sortedCount.map((it) => pointsCountByType.get(it));
  chartConfig.options.title.text = Statistic.TRANSPORT.toUpperCase();
  chartConfig.options.plugins.datalabels.formatter = (it) => `${it}x`;

  return new Chart(transportCtx, chartConfig);
};

export const renderTimeSpendChart = (timeSpendCtx, points) => {
  const pointsTimeSpend = getPointsTimeSpendByType(points);
  const sortedTimeSpend = getSortedKeysFromMap(pointsTimeSpend);
  const chartConfig = DefaultChartConfig.getDefaultChart();
  chartConfig.data.labels = sortedTimeSpend;
  chartConfig.data.datasets[0].data = sortedTimeSpend.map((it) => pointsTimeSpend.get(it));
  chartConfig.options.title.text = Statistic.TIME_SPEND.toUpperCase();
  chartConfig.options.plugins.datalabels.formatter = (it) => `${Math.floor(it)}H`;

  return new Chart(timeSpendCtx, chartConfig);
};

