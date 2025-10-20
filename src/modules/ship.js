/**
 * Represents a ship in the Battleship game.
 * Tracks ship size and damage to determine if it's been sunk.
 * 
 * @class Ship
 * @param {number} length - The size/length of the ship (number of cells it occupies). Minimum value is 1.
 * @param {number} [hitCount=0] - Initial number of hits (used for testing or loading saved games).
 * 
 * @property {number} length - The ship's size (1-5 cells). Values < 1 are clamped to 1.
 * @property {number} hitCount - Current number of successful hits on this ship.
 * 
 * @example
 * const carrier = new Ship(5);  // Creates a 5-cell ship (Carrier)
 * carrier.hit();                // Increment hits
 * carrier.isSunk();             // Returns false (1/5 hits)
 * 
 * @example
 * const destroyer = new Ship(2);
 * destroyer.hit();
 * destroyer.hit();
 * destroyer.isSunk();           // Returns true (2/2 hits - sunk)
 */
class Ship {
  constructor(length, hitCount = 0) {
    if (length < 1) {
      this.length = 1;
    } else {
      this.length = length;
    }
    this.hitCount = hitCount;
  }

  /**
   * Registers a hit on the ship by incrementing the hit counter.
   * 
   * @returns {void}
   */
  hit() {
    this.hitCount++;
  }

  /**
   * Checks if the ship has been sunk.
   * 
   * @returns {boolean} True if the ship is completely destroyed, false if it still has remaining health.
   */
  isSunk() {
    return this.hitCount === this.length;
  }
}

export default Ship;