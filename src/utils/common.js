import {MONTHS} from "../const.js";
import moment from 'moment';

// export const formatTime = (UTCTimestamp) => {
//   const date = new Date(UTCTimestamp);
//   const hours = date.getHours();
//   const minutes = date.getMinutes();
//   return `${hours < 10 ? `0` + hours : hours}:${minutes < 10 ? `0` + minutes : minutes}`;
// };

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const getFullDate = (date) => {
  return moment(date).format(`DD/MM/YY`);
};

const setTimeFormat = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const formatTimeDuration = (start, end) => {
  const days = moment(end - start).get(`days`) >= 1 ? `${setTimeFormat(moment(end - start).get(`days`))}D ` : ``;
  const hours = moment(end - start).get(`hour`) >= 1 ? `${setTimeFormat(moment(end - start).get(`hour`))}H ` : ``;
  const minutes = moment(end - start).get(`minutes`) >= 1 ? `${setTimeFormat(moment(end - start).get(`minutes`))}M ` : ``;
  return `${days} ${hours} ${minutes}`;
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
    Math.floor(Math.random() * 24 * 60 * 60 * 1000)
  );
};

export const getMonthName = (date) => MONTHS[date.getMonth()];

// export const getFullDate = (UTCTimestamp) => {
//   const date = new Date(UTCTimestamp);
//   const month = date.getMonth() + 1;
//   const day = date.getDate();
//   return `${date.getYear() - 100}/${month < 10 ? `0` + month : month}/${day < 10 ? `0` + day : day}`;
// };

// export const getHoursAndMinutes = (time) => {
//   const date = new Date(time);
//   return `${date.getHours()}:${date.getMinutes()}`;
// };
