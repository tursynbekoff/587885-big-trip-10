import {FilterType} from '../const.js';

const isFuture = (startDate, date) => startDate > date;
const isPast = (endDate, date) => endDate < date;

export const getFuturePoints = (points, date) => {
  return points.filter((point) => {
    const startDate = point.startDate;
    return isFuture(startDate, date);
  });
};

export const getPastPoints = (points, date) => {
  return points.filter((point) => {
    const endDate = point.endDate;
    return isPast(endDate, date);
  });
};

export const getPointsByFilter = (points, filterType) => {
  const date = new Date();

  switch (filterType) {
    case FilterType.FUTURE:
      return getFuturePoints(points, date);
    case FilterType.PAST:
      return getPastPoints(points, date);
    default:
      return points;
  }
};

// export const getFuturePoints = (points, date) => {
//   return getFilterPoints(points, date, flag);
// };

// export const getPastPoints = (points, date) => {
//   const flag = false;
//   return getFilterPoints(points, date, flag);
// };
