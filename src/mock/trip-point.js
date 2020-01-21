import {getRandomArrayItem, getDescriptions, getOffers, getRandomDate} from '../utils/common.js';
import {ROUTE_TYPES} from '../const.js';

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

const CITIES = [
  `London`,
  `Berlin`,
  `New Mexico`,
  `Rome`,
  `Vienna`,
  `Budapest`,
  `Prague`,
];

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
];

const OFFERS = [
  {type: `Check-In`, name: `Add luggage`, cost: 10, isChecked: false},
  {type: `Flight`, name: `Switch to comfort class`, cost: 150, isChecked: false},
  {type: `Restaurant`, name: `Add meal`, cost: `2`, isChecked: false},
  {type: `Train`, name: `Choose seats`, cost: `9`, isChecked: true},
  {type: `Check-In`, name: `Add luggage`, cost: 10, isChecked: false},
  {type: `Flight`, name: `Switch to comfort class`, cost: 150, isChecked: false},
  {type: `Restaurant`, name: `Add meal`, cost: `2`, isChecked: false},
  {type: `Train`, name: `Choose seats`, cost: `9`, isChecked: true},
  {type: `Check-In`, name: `Add luggage`, cost: 10, isChecked: false},
  {type: `Flight`, name: `Switch to comfort class`, cost: 150, isChecked: false},
  {type: `Restaurant`, name: `Add meal`, cost: `2`, isChecked: false},
  {type: `Train`, name: `Choose seats`, cost: `9`, isChecked: true},
];

// const ONE_WEEK = 604800000;

const createTripPoint = () => {
  const firstDate = getRandomDate();
  const secondDate = getRandomDate();
  const startDate = Math.min(firstDate, secondDate);
  const endDate = Math.max(firstDate, secondDate);

  return {
    type: getRandomArrayItem(ROUTE_TYPES),
    destination: getRandomArrayItem(CITIES),
    img: `http://picsum.photos/300/150?r=${Math.random()}`,
    description: getDescriptions(DESCRIPTIONS),
    price: Math.floor(Math.random() * 1000) + 1,
    offers: getOffers(OFFERS),
    startDate,
    endDate,
  };
};

export const createTripRoute = (number) => {
  return new Array(number).fill(``).map(createTripPoint);
};

const generateDays = (number, pointsPerDay) => (
  new Array(number)
    .fill(``)
    .map((elem, index) => ({
      day: index + 1,
      dayInfo: createTripRoute(pointsPerDay),
      dayDate: new Date()
    })
    )
);

const DAYS_AMOUNT = 3;
const POINTS_PER_DAY = 4;

export const days = generateDays(DAYS_AMOUNT, POINTS_PER_DAY);

