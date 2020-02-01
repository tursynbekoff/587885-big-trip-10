export default class Offer {
  constructor(data) {
    this.type = data[`type`];
    this.offers = Array.from(data[`offers`]).map((it) => {
      return {
        title: it[`title`],
        price: it[`price`],
      };
    });
  }

  static parseOffer(data) {
    return new Offer(data);
  }

  static parseOffers(data) {
    return data.map(Offer.parseOffer);
  }
}
