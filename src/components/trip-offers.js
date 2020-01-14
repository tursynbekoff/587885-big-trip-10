export const createOffersTemplate = (offers) => {
  return offers.map((it) => (
    `<li class="event__offer">
            <span class="event__offer-title">${it.name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${it.cost}</span>
           </li>`
  )).join(``);
};
