export default class Destination {
  constructor(data) {
    this.destination = {
      description: data[`description`],
      name: data[`name`],
      pictures: Array.from(data[`pictures`]).map((it) => {
        return {
          src: it[`src`],
          description: it[`description`],
        };
      }),
    };
  }

  static parseDestination(data) {
    return new Destination(data);
  }

  static parseDestinations(data) {
    return data.map(Destination.parseDestination);
  }
}
