export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`].toString().charAt(0).toUpperCase() + data[`type`].toString().slice(1);
    this.destination = {
      description: data[`destination`][`description`],
      name: data[`destination`][`name`],
      pictures: Array.from(data[`destination`][`pictures`]).map((it) => {
        return {
          src: it[`src`],
          description: it[`description`],
        };
      })
    };
    this.startDate = data[`date_from`] ? new Date(data[`date_from`]) : null;
    this.endDate = data[`date_to`] ? new Date(data[`date_to`]) : null;
    this.duration = this.endDate - this.startDate ? this.endDate - this.startDate : 0;
    this.price = data[`base_price`];
    this.offers = Array.from(data[`offers`]).map((it) => {
      return {
        title: it[`title`],
        price: it[`price`],
      };
    });
    this.isFavorite = Boolean(data[`is_favorite`]);
  }

  toRAW() {
    return {
      'id': this.id,
      'type': this.type,
      'destination': {
        'name': this.destination.name,
        'description': this.destination.description,
        'pictures': this.destination.pictures.map((it) => {
          return {
            'src': it.src,
            'description': it.description,
          };
        })
      },
      'base_price': this.price,
      'offers': this.offers((it) => {
        return {
          'title': it.title,
          'price': it.price,
        };
      }),
      'date_from': this.startDate,
      'date_to': this.endDate,
      'is_favorite': this.isFavorite,
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}
