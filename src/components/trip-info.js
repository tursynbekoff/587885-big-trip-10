// export const createRouteInfoTemplate = () => {
//   return `<div class="trip-info__main">
//     <h1 class="trip-info__title">Amsterdam &mdash; ... &mdash; Amsterdam</h1>

//     <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
//   </div>`;
// };


import {getMonthName} from "../utils.js";

const createCitiesTemplate = (points) => {
  return points.map(({destination}) => destination).join(` — `);
};

const getTripDates = (data) => {
  const lastIndex = data.length - 1;
  const dayDate = data[lastIndex].dayDate;
  return `${getMonthName(data[0].dayDate)} ${data[0].dayDate.getDate()}&nbsp;—&nbsp;${dayDate.getDate() + lastIndex}`;
};

export const createTripInfoTemplate = (days) => {
  const citiesTemplate = createCitiesTemplate(days.map((day) => day.dayInfo).flat());
  return (
    `<div class="trip-info__main">
    <h1 class="trip-info__title">${citiesTemplate}</h1>
    <p class="trip-info__dates">${getTripDates(days)}</p>
    </div>`
  );
};
