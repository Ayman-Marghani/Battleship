import Gameboard from "./gameboard";

/**
 * Represents a player in the Battleship game.
 * 
 * @class Player
 * @param {boolean} isComputer - Indicates whether the player is controlled by AI.
 * @param {string} [name="Computer"] - The player's display name.
 * 
 * @property {boolean} isComputer - Whether this player is AI-controlled.
 * @property {string} name - The player's name.
 * @property {Gameboard} gameboard - The player's personal game board containing ships and attack history.
 * 
 * @example
 * const player1 = new Player(false, "Ayman");
 * const computerPlayer = new Player(true);
 */
class Player {
  constructor(isComputer, name = "Computer") {
    this.isComputer = isComputer;
    this.name = name;
    this.gameboard = new Gameboard();
  }

  // Ship placement methods

  /**
   * Places a ship on the player's game board at the specified coordinates.
   * 
   * @param {number} x - The row coordinate (0-9).
   * @param {number} y - The column coordinate (0-9).
   * @returns {boolean} True if the ship was successfully placed, false otherwise.
   */
  placeShip(x, y) {
    return this.gameboard.placeShip(x, y);
  }

  /**
   * Toggles the axis orientation (horizontal/vertical) for the next ship placement.
   */
  changeShipAxis() {
    this.gameboard.changeAxis();
  }

  /**
   * Automatically places all ships randomly on the board with valid positions.
   */
  randomizeShips() {
    this.gameboard.randomizeShips();
  }

  /**
   * Returns an array indicating which ships have been placed on the board.
   * 
   * @returns {boolean[]} Array where each index corresponds to a ship type (Carrier, Battleship, etc.).
   */
  getIsShipPlacedArr() {
    return this.gameboard.getIsShipPlacedArr();
  }

  /**
   * Checks if all ships have been placed on the board.
   * 
   * @returns {boolean} True if all 5 ships are placed, false otherwise.
   */
  isAllShipsPlaced() {
    return this.gameboard.isAllShipsPlaced();
  }

  // Attack methods

  /**
   * Receives an attack at the specified board coordinates.
   * Marks the cell as hit or miss and updates ship damage if applicable.
   * 
   * @param {number} x - The row coordinate being attacked.
   * @param {number} y - The column coordinate being attacked.
   * @returns {boolean} True if the attack hit a ship, false if it missed, null if coordinates aren't valid.
   */
  receiveAttack(x, y) {
    return this.gameboard.receiveAttack(x, y);
  }

  /**
   * Determines if the player has lost the game (all ships sunk).
   * 
   * @returns {boolean} True if all ships on this player's board are sunk, false otherwise.
   */
  isLoser() {
    return this.gameboard.isAllShipsSunk();
  }

  // Display methods

  /**
   * Returns a visual representation of the game board.
   * 
   * @returns {Array[]} 2D array representing the current board state.
   */
  getBoard() {
    return this.gameboard.display();
  }
}

export default Player;
