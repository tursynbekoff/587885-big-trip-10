import {MONTHS} from "./const.js";

export const formatTime = (UTCTimestamp) => {
  const date = new Date(UTCTimestamp);
  return `${date.getHours()}:${date.getMinutes()}`;
};

export const getRandomInteger = (min, max) =>
  min + Math.floor(max * Math.random());

export const getRandomArrayItem = (array) =>
  array[getRandomInteger(0, array.length)];

export const shuffleArray = (array) =>
  array.map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);

export const getDescriptions = (array) =>
  shuffleArray(array).slice(0, getRandomInteger(1, 3)).join(` `);

export const getOffers = (array) => array.filter(() => Math.random() > 0.5).slice(0, getRandomInteger(0, 2));

export const getRandomDate = () => {
  return (
    Date.now() +
    1 +
    Math.floor(Math.random() * 7) * 24 * getRandomInteger(0, 60) * 60 * 1000
  );
};

export const getMonthName = (date) => MONTHS[date.getMonth()];

export const getFullDate = (date) => (`${date.getFullYear()}-${getHoursAndMinutes(date.getMonth())}-${getHoursAndMinutes(date.getDate())}`);

export const getHoursAndMinutes = (time) => {
  const date = new Date(time);
  return `${date.getHours()}:${date.getMinutes()}`;
};

