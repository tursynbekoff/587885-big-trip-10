import moment from 'moment';

const setTimeFormat = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const sortPoints = (points) => points.sort((a, b) => a.startDate > b.startDate);

export const getUnixFromFlatpickr = (date) => {
  return moment(date, `DD/MM/YYYY HH:mm`).unix();
};

export const getDateAndTime = (date) => {
  return moment(date).format(`DD/MM/YY HH:mm`);
};

export const getIOSTimeFromForm = (data, from) => {
  return moment(data.get(from), `DD/MM/YY HH:mm`).toISOString();
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

export const getIOSTime = (date) => {
  return moment(date).toISOString();
};

export const capitalizeString = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const formatTimeDuration = (duration) => {
  const daysNotFormat = moment.duration(duration).days();
  const days = daysNotFormat >= 1 ? `${setTimeFormat(daysNotFormat)}D ` : ``;
  const hoursNotFormat = moment.duration(duration).hours();
  const hours = hoursNotFormat >= 1 || daysNotFormat >= 1 ? `${setTimeFormat(hoursNotFormat)}H ` : ``;
  const minutesNotFormat = moment.duration(duration).minutes();
  const minutes = `${setTimeFormat(minutesNotFormat)}M`;
  return days + hours + minutes;
};

export const getOffers = function (offers, type) {
  const suitibleOffers = offers.filter((it) => it.type.toLowerCase() === type.toLowerCase());
  if (suitibleOffers[0]) {
    return suitibleOffers[0].offers;
  } else {
    return [];
  }
};

export const getRightPriceForOffers = (points, offers) => {
  const suitibleOffers = points.map((point) => getOffers(offers, point.type));
  points.forEach((point, index) => {
    if (suitibleOffers[index].length > 0) {
      point.offers.forEach(function (pointOffer) {
        pointOffer.price = suitibleOffers[index].find((offer) => offer.title === pointOffer.title).price;
      });
    }
  });
};

