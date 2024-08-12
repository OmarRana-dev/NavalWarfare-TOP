export class Ship {
  constructor(length) {
    this.length = length;
    this.damege = 0;
  }

  hitShip() {
    this.damege += 1;
  }

  isSunk() {
    return this.damege >= this.length;
  }
}
