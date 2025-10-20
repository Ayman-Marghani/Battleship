import {BOARD_SIZE, SHIP_LENGTHS} from '../constants';
import Ship from './ship';
import {isCoordValid} from './helperFunctions';

/**
 * Represents a Battleship game board with ship placement, attack handling, and collision detection.
 * 
 * @class Gameboard
 * 
 * @property {Array<Array<Ship|boolean|null>>} gameBoardMatrix - Main game state matrix.
 *   - `null`: empty cell
 *   - `Ship`: ship object (not yet hit)
 *   - `true`: hit cell
 *   - `false`: miss cell
 * @property {Array<Array<string>>} testMatrix - Validation matrix for ship placement.
 *   - `'-'`: empty
 *   - `'X'`: temporary position being verified
 *   - `'ship'`: confirmed ship position
 * @property {Ship[]} shipsArr - Array of placed Ship objects.
 * @property {Array<[number, number]>} shipsCoords - Starting coordinates for each placed ship.
 * @property {boolean[]} shipsHorizontal - Orientation for each ship (true = horizontal, false = vertical).
 * 
 * @example
 * const board = new Gameboard();
 * board.placeShip(0, 0); // Places first ship (Carrier) horizontally at (0,0)
 * board.changeAxis();    // Toggle to vertical
 * board.placeShip(5, 5); // Places second ship (Battleship) vertically at (5,5)
 */
class Gameboard {
  constructor() {
    this.gameBoardMatrix = Array.from({length: BOARD_SIZE}, () => Array(BOARD_SIZE).fill(null)); 
    this.testMatrix = Array.from({length: BOARD_SIZE}, () => Array(BOARD_SIZE).fill('-')); 
    this.shipsArr = [];
    this.shipsCoords = [];
    this.shipsHorizontal = Array(SHIP_LENGTHS.length).fill(true);
  }

  // Helper methods

  /**
   * Checks if a cell at (x, y) collides with any neighboring ships.
   * A collision occurs if any of the 8 surrounding cells contains a confirmed ship.
   * 
   * @private
   * @param {number} x - Row coordinate.
   * @param {number} y - Column coordinate.
   * @returns {boolean} True if collision detected, false otherwise.
   */
  collision(x, y) {
    const neighborXArr = [-1, -1, -1, 1, 1, 1, 0, 0]; 
    const neighborYArr = [-1, 0, 1, -1, 0, 1, -1, 1]; 
    for (let i = 0; i < neighborXArr.length; i++) {
      const neighborX = x + neighborXArr[i];
      const neighborY = y + neighborYArr[i];
      if (isCoordValid(neighborX, neighborY)) {
        if (this.testMatrix[neighborX][neighborY] === 'ship') {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Validates and tentatively places the next ship starting at (x, y).
   * Checks all cells the ship will occupy for validity and collisions.
   * Updates testMatrix with 'ship' markers if valid, or reverts if invalid.
   * 
   * @private
   * @param {number} x - Starting row coordinate.
   * @param {number} y - Starting column coordinate.
   * @returns {boolean} True if all ship cells are valid and collision-free, false otherwise.
   */
  checkShipCoord(x, y) {
    this.shipsCoords.push([x, y]);
    const idx = this.shipsCoords.length - 1;
    const size = SHIP_LENGTHS[idx];
    const isHorizontal = this.shipsHorizontal[idx];

    for (let i = 0; i < size; i++) {
      if (!isCoordValid(x, y) || this.collision(x, y)) {
        this.shipsCoords.pop();
        return false;
      }
      this.testMatrix[x][y] = 'X';
      if (isHorizontal) y++;
      else x++;
    }

    // Mark validated cells as confirmed ships
    let [tempX, tempY] = this.shipsCoords[idx];
    for (let i = 0; i < size; i++) {
      this.testMatrix[tempX][tempY] = 'ship';
      if (isHorizontal) tempY++;
      else tempX++;
    }
    return true;
  }

  /**
   * Marks all empty cells surrounding a sunk ship as misses using BFS.
   * Prevents wasted guesses on cells adjacent to destroyed ships.
   * 
   * @private
   * @param {number} x - Row coordinate of a sunk ship cell.
   * @param {number} y - Column coordinate of a sunk ship cell.
   */
  markSunkShipNeighbors(x, y) {
    const visited = Array.from({length: BOARD_SIZE}, () => Array(BOARD_SIZE).fill(false)); 
    const neighborXArr = [-1, -1, -1, 1, 1, 1, 0, 0]; 
    const neighborYArr = [-1, 0, 1, -1, 0, 1, -1, 1]; 
    const coordQueue = [[x, y]];

    while (coordQueue.length !== 0) {
      const [curX, curY] = coordQueue.shift();
      if (!visited[curX][curY]) {
        visited[curX][curY] = true;
        for (let i = 0; i < neighborXArr.length; i++) {
          const neighborX = curX + neighborXArr[i];
          const neighborY = curY + neighborYArr[i];
          if (isCoordValid(neighborX, neighborY)) {
            if (this.gameBoardMatrix[neighborX][neighborY] === null) {
              this.gameBoardMatrix[neighborX][neighborY] = false;
            } else if (this.gameBoardMatrix[neighborX][neighborY] === true) {
              coordQueue.push([neighborX, neighborY]);
            }
          }
        }
      }
    }
  }

  // Ship placement methods

  /**
   * Attempts to place the next ship starting at (x, y).
   * Uses current axis orientation from shipsHorizontal array.
   * Updates gameBoardMatrix with Ship objects on success.
   * Ships are placed in order: Carrier → Battleship → Cruiser → Submarine → Destroyer.
   * 
   * @param {number} x - Starting row coordinate (0-9).
   * @param {number} y - Starting column coordinate (0-9).
   * @returns {boolean} True if ship placed successfully, false if invalid position.
   */
  placeShip(x, y) {
    if (this.checkShipCoord(x, y)) {
      const idx = this.shipsCoords.length - 1;
      const size = SHIP_LENGTHS[idx];
      const isHorizontal = this.shipsHorizontal[idx];

      this.shipsArr.push(new Ship(size));
      const curShip = this.shipsArr[idx];

      for (let i = 0; i < size; i++) {
        this.gameBoardMatrix[x][y] = curShip;
        if (isHorizontal) {
          y++;
        } else {
          x++;
        }
      }
      return true;
    }
    return false;
  }

  /**
   * Toggles the axis orientation for all ships (horizontal ↔ vertical).
   * Affects the next ship to be placed.
   */
  changeAxis() {
    this.shipsHorizontal = this.shipsHorizontal.map(axis => !axis);
  }

  /**
   * Automatically places all ships in random valid positions with random orientations.
   * Continues attempting placement until all ships are successfully positioned.
   */
  randomizeShips() {
    for (let i = 0; i < SHIP_LENGTHS.length; i++) {
      this.shipsHorizontal[i] = Math.random() < 0.5;
      let isPlaced = null;
      do {
        const x = Math.floor(Math.random() * BOARD_SIZE);
        const y = Math.floor(Math.random() * BOARD_SIZE);
        isPlaced = this.placeShip(x, y);
      } while (!isPlaced);
    }
  }

  /**
   * Returns an array indicating which ships have been placed.
   * Index corresponds to SHIP_NAMES order: [carrier, battleship, cruiser, submarine, destroyer].
   * 
   * @returns {boolean[]} Array of booleans; true at index i means ship i is placed.
   */
  getIsShipPlacedArr() {
    const isPlacedArr = Array(SHIP_LENGTHS.length).fill(false);
    for (let i = 0; i < this.shipsArr.length; i++) {
      isPlacedArr[i] = true;
    }
    return isPlacedArr;
  }

  /**
   * Checks if all ships have been placed on the board.
   * 
   * @returns {boolean} True if all ships placed, false otherwise.
   */
  isAllShipsPlaced() {
    return this.shipsArr.length === SHIP_LENGTHS.length;
  }

  // Attack methods

  /**
   * Processes an attack at the specified coordinates.
   * Updates gameBoardMatrix: Ship → true (hit), null → false (miss).
   * Automatically marks neighbors of sunk ships as misses.
   * 
   * @param {number} x - Row coordinate of the attack.
   * @param {number} y - Column coordinate of the attack.
   * @returns {boolean|null} True if hit, false if miss, null if invalid coordinates or already attacked.
   */
  receiveAttack(x, y) {
    if (!isCoordValid(x, y)) return null;

    // Hit case
    if (this.gameBoardMatrix[x][y] instanceof Ship) {
      this.gameBoardMatrix[x][y].hit();
      if (this.gameBoardMatrix[x][y].isSunk()) {
        this.markSunkShipNeighbors(x, y);
      }
      this.gameBoardMatrix[x][y] = true;
      return true;
    }
    // Miss case
    else if (this.gameBoardMatrix[x][y] === null) {
      this.gameBoardMatrix[x][y] = false;
      return false;
    }
    // Already attacked
    return null;
  }

  /**
   * Checks if all ships on the board have been sunk.
   * 
   * @returns {boolean} True if all ships destroyed, false if any ship remains afloat.
   */
  isAllShipsSunk() {
    for (const ship of this.shipsArr) {
      if (!ship.isSunk()) return false;
    }
    return true;
  }

  // Display methods

  /**
   * Returns a simplified 2D string representation of the board state.
   * 
   * @returns {string[][]} 10x10 array where:
   *   - `'-'`: empty cell
   *   - `'H'`: hit (ship cell that was hit)
   *   - `'M'`: miss
   *   - `'X'`: ship cell (not yet hit)
   */
  display() {
    return this.gameBoardMatrix.map((row) => {
      return row.map((item) => {
        if (item === null) return '-';
        else if (item === true) return 'H';
        else if (item === false) return 'M';
        else return 'X';
      });
    });
  }
}

export default Gameboard;