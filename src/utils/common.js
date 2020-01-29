import {MONTHS} from "../const.js";
import moment from 'moment';

export const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

export const getFullDate = (date) => {
  return moment(date).format(`DD/MM/YY`);
};

const setTimeFormat = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const formatTimeDuration = (duration) => {
  const daysNotFormat = moment.duration(duration).days();
  const days = daysNotFormat >= 1 ? `${setTimeFormat(daysNotFormat)}D ` : ``;
  const hoursNotFormat = moment.duration(duration).hours();
  const hours = hoursNotFormat >= 1 || daysNotFormat >= 1 ? `${setTimeFormat(hoursNotFormat)}H ` : ``;
  const minutesNotFormat = moment.duration(duration).minutes();
  const minutes = `${setTimeFormat(minutesNotFormat)}M`;
  return days + hours + minutes;
};


export const getRandomInteger = (min, max) =>
  min + Math.floor(max * Math.random());

export const getRandomArrayItem = (array) =>
  array[getRandomInteger(0, array.length)];

export const shuffleArray = (array) =>
  array.map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);

export const getDescriptions = (array) =>
  shuffleArray(array).slice(0, getRandomInteger(1, 3)).join(` `);

export const getOffers = (array) => array.filter(() => Math.random() > 0.5).slice(0, getRandomInteger(0, 6));

export const getRandomDate = () => {
  return (
    Date.now() +
    1 +
    Math.floor(Math.random() * 24 * 60 * 60 * 1000 * 7) - Math.floor(Math.random() * 24 * 60 * 60 * 1000 * 5)
  );
};

export const getMonthName = (date) => MONTHS[date.getMonth()];
