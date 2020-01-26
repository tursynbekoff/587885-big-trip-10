import {getRandomArrayItem, getRandomDate} from '../utils/common.js';
import {ROUTE_TYPES} from '../const.js';
import moment from 'moment';

// const ROUTE_TYPES = [
//   `Bus`,
//   `Check-in`,
//   `Drive`,
//   `Flight`,
//   `Restaurant`,
//   `Ship`,
//   `Sightseeing`,
//   `Taxi`,
//   `Train`,
//   `Transport`,
// ];

export const CITIES = [
  `London`,
  `Berlin`,
  `New-Mexico`,
  `Rome`,
];

export const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
];

// export const OFFERS = [
//   {type: `Check-In`, name: `Add luggage`, cost: 10, isChecked: false},
//   {type: `Flight`, name: `Switch to comfort class`, cost: 150, isChecked: false},
//   {type: `Restaurant`, name: `Add meal`, cost: `2`, isChecked: false},
//   {type: `Train`, name: `Choose seats`, cost: `9`, isChecked: true},
//   {type: `Check-In`, name: `Add luggage`, cost: 10, isChecked: false},
//   {type: `Flight`, name: `Switch to comfort class`, cost: 150, isChecked: false},
//   {type: `Restaurant`, name: `Add meal`, cost: `2`, isChecked: false},
//   {type: `Train`, name: `Choose seats`, cost: `9`, isChecked: true},
//   {type: `Check-In`, name: `Add luggage`, cost: 10, isChecked: false},
//   {type: `Flight`, name: `Switch to comfort class`, cost: 150, isChecked: false},
//   {type: `Restaurant`, name: `Add meal`, cost: `2`, isChecked: false},
//   {type: `Train`, name: `Choose seats`, cost: `9`, isChecked: true},
// ];

export const OFFERS = [
  {type: `bus`, offers: [{title: `bus`, price: `10`}, {title: `bus`, price: `45`}]},
  {type: `flight`, offers: [{title: `flight`, price: `30`}, {title: `flight`, price: `60`}]},
  {type: `check-in`, offers: [{title: `check-in`, price: `30`}, {title: `check-in`, price: `60`}]},
  {type: `restaurant`, offers: [{title: `restaurant`, price: `30`}, {title: `restaurant`, price: `60`}]},
  {type: `train`, offers: [{title: `train`, price: `30`}, {title: `train`, price: `60`}]},

];


export const DESTINATIONS = [
  {description: `abracadabra1`, name: `London`, pictures: [{src: `http://picsum.photos/300/150?r=${Math.random()}`, description: `London`}, {src: `http://picsum.photos/300/150?r=${Math.random()}`, description: `London`}]},
  {description: `abracadabra2`, name: `Berlin`, pictures: [{src: `http://picsum.photos/300/150?r=${Math.random()}`, description: `Berlin`}, {src: `http://picsum.photos/300/150?r=${Math.random()}`, description: `Berlin`}]},
  {description: `abracadabra3`, name: `New-Mexico`, pictures: [{src: `http://picsum.photos/300/150?r=${Math.random()}`, description: `New-Mexico`}, {src: `http://picsum.photos/300/150?r=${Math.random()}`, description: `New-Mexico`}]},
  {description: `abracadabra4`, name: `Rome`, pictures: [{src: `http://picsum.photos/300/150?r=${Math.random()}`, description: `Rome`}, {src: `http://picsum.photos/300/150?r=${Math.random()}`, description: `Rome`}]},
];


export const getOffers = function (offers, type) {
  const suitibleOffers = offers.filter((it) => it.type === type.toLowerCase());
  if (suitibleOffers[0]) {
    return suitibleOffers[0].offers;
  } else {
    return null;
  }
};

const createTripPoint = () => {
  const firstDate = getRandomDate();
  const secondDate = getRandomDate();
  const startDate = Math.min(firstDate, secondDate);
  const endDate = Math.max(firstDate, secondDate);
  const type = getRandomArrayItem(ROUTE_TYPES);
  const offers = getOffers(OFFERS, type);


  return {
    type,
    destination: getRandomArrayItem(DESTINATIONS),
    price: Math.floor(Math.random() * 1000) + 1,
    offers,
    startDate,
    endDate,
    isFavorite: Math.random() > 0.5,
  };
};

export const createTripRoute = (number) => {
  return new Array(number).fill(``).map(createTripPoint);
};

const generateDays = (number, pointsPerDay) => (
  new Array(number)
    .fill(``)
    .map((_elem, index) => ({
      day: index + 1,
      dayInfo: createTripRoute(pointsPerDay),
      dayDate: new Date(moment(new Date()).get() + index * 24 * 60 * 60 * 1000),
    }))
);

const DAYS_AMOUNT = 3;
const POINTS_PER_DAY = 4;

export const days = generateDays(DAYS_AMOUNT, POINTS_PER_DAY);

