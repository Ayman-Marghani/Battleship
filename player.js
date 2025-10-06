import Gameboard from "./gameboard";

class Player {
  constructor(isComputer, name = "Computer") {
    this.isComputer = isComputer;
    this.name = name;
    this.gameboard = new Gameboard();
  }
  receiveAttack(x, y) {
    const isHit = this.gameboard.receiveAttack(x, y);
    return isHit;
  }
  isLoser() {
    return this.gameboard.isAllShipsSunk();
  }
}

export default Player;