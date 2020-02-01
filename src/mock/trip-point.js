// import {getOffers} from '../utils/common.js';
import {ROUTE_TYPES} from '../const.js';

// только в моках
const getRandomDate = () => {
  return (
    Date.now() +
    1 +
    Math.floor(Math.random() * 24 * 60 * 60 * 1000 * 3) - Math.floor(Math.random() * 24 * 60 * 60 * 1000 * 2)
  );
};

const getRandomInteger = (min, max) =>
  min + Math.floor(max * Math.random());

// только в моках
export const getRandomArrayItem = (array) =>
  array[getRandomInteger(0, array.length)];

const shuffleArray = (array) =>
  array.map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);

// только в моках
export const getDescriptions = (array) =>
  shuffleArray(array).slice(0, getRandomInteger(1, 3)).join(` `);

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

export const OFFERS = [
  {type: `bus`, offers: [{title: `bus1`, price: 10}, {title: `bus2`, price: 45}]},
  {type: `flight`, offers: [{title: `flight1`, price: 30}, {title: `flight2`, price: 60}]},
  {type: `check-in`, offers: [{title: `check-in1`, price: 30}, {title: `check-in2`, price: 60}]},
  {type: `restaurant`, offers: [{title: `restaurant1`, price: 30}, {title: `restaurant2`, price: 60}]},
  {type: `train`, offers: [{title: `train1`, price: 30}, {title: `train2`, price: 60}]},

];


export const DESTINATIONS = [
  {description: `abracadabra1`, name: `London`, pictures: [{src: `http://picsum.photos/300/150?r=${Math.random()}`, description: `London`}, {src: `http://picsum.photos/300/150?r=${Math.random()}`, description: `London`}]},
  {description: `abracadabra2`, name: `Berlin`, pictures: [{src: `http://picsum.photos/300/150?r=${Math.random()}`, description: `Berlin`}, {src: `http://picsum.photos/300/150?r=${Math.random()}`, description: `Berlin`}]},
  {description: `abracadabra3`, name: `New-Mexico`, pictures: [{src: `http://picsum.photos/300/150?r=${Math.random()}`, description: `New-Mexico`}, {src: `http://picsum.photos/300/150?r=${Math.random()}`, description: `New-Mexico`}]},
  {description: `abracadabra4`, name: `Rome`, pictures: [{src: `http://picsum.photos/300/150?r=${Math.random()}`, description: `Rome`}, {src: `http://picsum.photos/300/150?r=${Math.random()}`, description: `Rome`}]},
];


// export const getOffers = function (offers, type) {
//   const suitibleOffers = offers.filter((it) => it.type === type.toLowerCase());
//   if (suitibleOffers[0]) {
//     return suitibleOffers[0].offers;
//   } else {
//     return null;
//   }
// };

export const createTripPoint = () => {
  const firstDate = getRandomDate();
  const secondDate = getRandomDate();
  const startDate = Math.min(firstDate, secondDate);
  const endDate = Math.max(firstDate, secondDate);
  const type = getRandomArrayItem(ROUTE_TYPES);
  // const offers = getOffers(OFFERS, type);

  return {
    id: String(new Date() + Math.random()),
    type,
    destination: getRandomArrayItem(DESTINATIONS),
    img: `http://picsum.photos/300/150?r=${Math.random()}`,
    description: getDescriptions(DESCRIPTIONS),
    price: Math.floor(Math.random() * 100) + 1,
    offers: [],
    startDate,
    endDate,
    isFavorite: Math.random() > 0.5,
    duration: endDate - startDate,
  };
};

export const createTripPoints = (number) => {
  return new Array(number).fill(``).map(createTripPoint);
};


// const generateDays = (number, pointsPerDay) => {
//   // new Points().setDays(createTripRoute(pointsPerDay));
//   return new Array(number)
//     .fill(``)
//     .map((_elem, index) => ({
//       day: index + 1,
//       dayInfo: createTripRoute(pointsPerDay),
//       dayDate: new Date(moment(new Date()).get() + index * 24 * 60 * 60 * 1000),
//     }));
// };

// const DAYS_AMOUNT = 3;
// const POINTS_PER_DAY = 4;

// export const days = generateDays(DAYS_AMOUNT, POINTS_PER_DAY);

