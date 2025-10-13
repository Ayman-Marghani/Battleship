/**
 * @class Ship
 * @constructor Ship(length, hitCount=0)
 * @property {number} length - The length of the ship.
 * @property {number} hitCount - The number of hits on the ship.
 * @method hit()
 * Increments the hit count of the ship.
 * @returns {void}
 * @method isSunk()
 * Checks if the ship is sunk by comparing the hit count to the length of the ship.
 * @returns {boolean} True if the ship is sunk, false otherwise.
 */
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