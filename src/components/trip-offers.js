const createOffersTemplate = (offers) => {
  return offers.map((it) => (
    `<li class="event__offer">
            <span class="event__offer-title">${it.name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${it.cost}</span>
           </li>`
  )).join(``);
};

export default class Offers {
  constructor(offers) {
    this._offers = offers;
    this._element = null;
  }

  getTemplate() {
    return createOffersTemplate(this._offers);
  }
}
