import {MONTHS} from "./const.js";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const formatTime = (UTCTimestamp) => {
  const date = new Date(UTCTimestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours < 10 ? `0` + hours : hours}:${minutes < 10 ? `0` + minutes : minutes}`;
};

export const formatTimeDuration = function (UTCTimestamp) {
  const date = new Date(UTCTimestamp);
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const days = date.getDay();
  if (days > 0) {
    return `${days < 10 ? `0` + days + `D ` : days + `D `}${hours < 10 ? `0` + hours + `H ` : hours + `H `}${minutes < 10 ? `0` + minutes + `M` : minutes + `M`}`;
  }
  if (hours > 0) {
    return `${hours < 10 ? `0` + hours + `H ` : hours + `H `}${minutes < 10 ? `0` + minutes + `M` : minutes + `M`}`;
  } else {
    return `${minutes < 10 ? `0` + minutes + `M` : minutes + `M`}`;
  }
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

export const getFullDate = (UTCTimestamp) => {
  const date = new Date(UTCTimestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${date.getYear() - 100}/${month < 10 ? `0` + month : month}/${day < 10 ? `0` + day : day}`;
};

export const getHoursAndMinutes = (time) => {
  const date = new Date(time);
  return `${date.getHours()}:${date.getMinutes()}`;
};

