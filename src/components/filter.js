// export const createFilterTemplate = () => {
//   return `<form class="trip-filters" action="#" method="get">
//               <div class="trip-filters__filter">
//                 <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
//                 <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
//               </div>

//               <div class="trip-filters__filter">
//                 <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
//                 <label class="trip-filters__filter-label" for="filter-future">Future</label>
//               </div>

//               <div class="trip-filters__filter">
//                 <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
//                 <label class="trip-filters__filter-label" for="filter-past">Past</label>
//               </div>

//               <button class="visually-hidden" type="submit">Accept filter</button>
//             </form>`;
// };

const createFilterMarkup = (filter) => {
  const {name, isActive} = filter;

  return `<div class="trip-filters__filter">
            <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isActive ? `checked` : ``}>
            <label class="trip-filters__filter-label" for="filter-${name}">${name.charAt(0).toUpperCase() + name.slice(1)}</label>
          </div>`;
};

export const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => (createFilterMarkup(it))).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`);
};
