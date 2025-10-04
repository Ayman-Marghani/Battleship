class Ship {
  constructor(length, hitCount = 0) {
    if (length < 1) {
      this.length = 1;
    }
    else {
      this.length = length;
    }
    this.hitCount = hitCount;
  }
  hit() {
    this.hitCount++;
  }
  isSunk() {
    return this.hitCount === this.length;
  }
}

export default Ship;