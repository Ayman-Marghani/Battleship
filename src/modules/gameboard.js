import Ship from "./ship";

/**
 * @class Gameboard
 * @constructor Gameboard()
 * @property {Array<Array<Cell>>} gameBoardMatrix - The 2D array representing the game board.
 * @property {Array<Ship>} shipsArr - The array of ships placed on the game board.
 * @method placeShips()
 * Places ships on the game board based on the provided ship sizes.
 * @returns {void}
 * @method receiveAttack(x, y)
 * Makes an attack on the game board at the specified coordinates.
 * @param {number} x - The x-coordinate of the attack.
 * @param {number} y - The y-coordinate of the attack.
 * @returns {void}
 * @method isAllShipsSunk()
 * Checks if all ships have been sunk.
 * @returns {boolean} True if all ships are sunk, false otherwise.
 * @method display()
 * Returns the current state of the game board as a 2D array of strings.
 * @returns {Array<Array<String>>} 
 */

class Gameboard {
  
  constructor() {
    const GAME_BOARD_SIZE = 10;
    // Init 2D array and initialize it with null
    // empty cell -> null, ship cell -> ship object, hit -> true, miss -> false
    this.gameBoardMatrix = Array.from({length: GAME_BOARD_SIZE}, () => Array(GAME_BOARD_SIZE).fill(null)); 
    this.shipsArr = [];
    this.placeShips();
  }

  placeShips() {
    const shipsSizes = [5, 4, 3, 3, 2];
    // TODO: Randomize and user input wil be used later
    const shipsCords = [[5, 0], [0, 6], [3, 2], [8, 7], [9, 1]];

    for (let i = 0; i < shipsSizes.length; i++) {
      // Get current ship size
      const curSize = shipsSizes[i];
      // Create a new ship and push it to shipsArr
      this.shipsArr.push(new Ship(curSize));
      const curShip = this.shipsArr[i];
      // Get current ship coordinates
      let [firstCord, secondCord] = shipsCords[i];
      // Place curShip on gameboard
      for (let count = 0; count < curSize; count++) {
        this.gameBoardMatrix[firstCord][secondCord] = curShip;
        secondCord++;
      }
    }
  }
  receiveAttack(x, y) {
    if (x < 0 || x >= this.gameBoardMatrix.length || y < 0 || y >= this.gameBoardMatrix.length) {
      return null;
    }
    // Case 1: hit
    if (this.gameBoardMatrix[x][y] !== null) {
      // Call hit() on ship object
      this.gameBoardMatrix[x][y].hit();
      this.gameBoardMatrix[x][y] = true; // true represents a hit cell
      return true;
    }
    // Case 2: miss
    else {
      this.gameBoardMatrix[x][y] = false; // false represents a miss cell
      return false;
    }
  }
  isAllShipsSunk() {
    // Call isSunk() for all ships
    for (const ship of this.shipsArr) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }
  display() {
    return this.gameBoardMatrix.map((row) => {
      return row.map((item) => {
        if (item === null) { // Empty cell
          return '-';
        }
        else if (item === true) { // Hit cell
          return 'H';
        }
        else if (item === false) { // Miss cell
          return 'M';
        }
        else { // Ship cell
          return 'X';
        }
      });
    });
  }
}

export default Gameboard;