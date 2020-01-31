// import {MONTHS} from "../const.js";
import moment from 'moment';

export const getTimeFromForm = (data, from) => {
  return moment(data.get(from), `DD/MM/YY HH:mm`).unix() * 1000;
};

export const getNumberFromDate = (date) => {
  return moment(date).unix();
};

export const getShortMonthAndDate = (date) => {
  return moment(date).format(`MMM DD`);
};

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

// это важно для отрисовки!
export const getOffers = function (offers, type) {
  const suitibleOffers = offers.filter((it) => it.type.toLowerCase() === type.toLowerCase());
  if (suitibleOffers[0]) {
    return suitibleOffers[0].offers;
  } else {
    return [];
  }
};

