import Gameboard from "./gameboard";

/**
 * @class Player
 * @constructor Player(isComputer, name="Computer")
 * @param {boolean} isComputer - Indicates whether the player is a computer player.
 * @param {string} [name="Computer"] - The name of the player.
 * @property {boolean} isComputer - Indicates whether the player is a computer player.
 * @property {string} name - The name of the player.
 * @property {Gameboard} gameboard - The game board object for the player.
 * @method receiveAttack(x, y)
 * Receives an attack on the player's game board at the specified coordinates.
 * @param {number} x - The x-coordinate of the attack.
 * @param {number} y - The y-coordinate of the attack.
 * @returns {boolean} True if the attack was successful, false otherwise.
 * @method isLoser()
 * Checks if the player has lost by determining if all their ships have been sunk.
 * @returns {boolean} True if the player has lost, false otherwise.
 */

class Player {
  constructor(isComputer, name = "Bot") {
    this.isComputer = isComputer;
    this.name = name;
    this.gameboard = new Gameboard();
  }
  receiveAttack(x, y) {
    const isHit = this.gameboard.receiveAttack(x, y);
    return isHit;
  }
  placeShip(x, y) {
    const isPlaced = this.gameboard.placeShip(x, y);
    return isPlaced;
  }
  changeShipAxis() {
    this.gameboard.changeAxis();
  }
  randomizeShips() {
    this.gameboard.randomizeShips();
  }
  getIsShipPlacedArr() {
    return this.gameboard.getIsShipPlacedArr();
  }
  isAllShipsPlaced() {
    return this.gameboard.isAllShipsPlaced();
  }
  isLoser() {
    return this.gameboard.isAllShipsSunk();
  }
  getBoard() {
    return this.gameboard.display();
  }
}

export default Player;