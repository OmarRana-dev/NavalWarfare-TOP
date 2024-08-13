class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.isDestroyed = false;
  }

  hit() {
    if (!this.isDestroyed) {
      this.hits += 1;
      if (this.hits >= this.length) {
        this.isDestroyed = true;
      }
    }
  }

  isSunk() {
    return this.isDestroyed;
  }
}

export { Ship };
