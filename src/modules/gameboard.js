import Ship from "./ship";

class Gameboard {
  
  constructor() {
    this.GAME_BOARD_SIZE = 10;
    // empty cell -> null, ship cell -> ship object, hit -> true, miss -> false
    this.gameBoardMatrix = Array.from({length: this.GAME_BOARD_SIZE}, () => Array(this.GAME_BOARD_SIZE).fill(null)); 
    // X -> temporary ship position being verified, ship -> verified ship position
    this.testMatrix = Array.from({length: this.GAME_BOARD_SIZE}, () => Array(this.GAME_BOARD_SIZE).fill('-')); 
    this.shipsArr = []; // Array of ships object
    this.shipsCords = []; // Array of ships' start position (x, y)
    this.shipsSizes = [5, 4, 3, 3, 2]; // Array of ship sizes
    this.shipsHorizontal = Array(5).fill(true); // Array of wether a ship is horizontal or vertical (Default is horizontal)
  }

  // Helper functions
  getRandomBool() {
    return Math.random() < 0.5;
  }
  isCoordValid(x, y) {
    // Invalid coordinates (out of board)
    if (x < 0 || x >= this.GAME_BOARD_SIZE || y < 0 || y >= this.GAME_BOARD_SIZE) {
      return false;
    }
    return true;
  }

  collision(x, y) { // Check for Collision with other ships
    // 8 neighbor cells indices
    const neighborXArr = [-1, -1, -1, 1, 1, 1, 0, 0]; 
    const neighborYArr = [-1, 0, 1, -1, 0, 1, -1, 1]; 
    for (let i = 0; i < neighborXArr.length; i++) {
      const neighborX = x + neighborXArr[i];
      const neighborY = y + neighborYArr[i];
      if (this.isCoordValid(neighborX, neighborY)) {
        if (this.testMatrix[neighborX][neighborY] === 'ship') { // If there is a ship on a neighbor cell
          return true;
        }
      }
    }
    return false;
  }

  checkShipCoord(x, y) { // returns true if all ships' cells are valid and there isn't a collision with other ships
    this.shipsCords.push([x, y]);
    // Get idx, size, and isHorizontal information of current ship
    const idx = this.shipsCords.length - 1;
    const size = this.shipsSizes[idx];
    const isHorizontal = this.shipsHorizontal[idx];
    for (let i = 0; i < size; i++) {
      // Check if coordinates are valid and if there is a collision with other ships
      if (!this.isCoordValid(x, y) || this.collision(x, y)) {
        this.shipsCords.pop();
        return false;
      }
      // Put X mark on testMatrix
      this.testMatrix[x][y] = 'X';
      if (isHorizontal) { // if ship direction is horizontal
        y++;
      }
      else { // if ship direction is vertical
        x++;
      }
    }
    // After making sure the positions of the ships' cell are valid, mark the cells with 'ship'
    let [tempX, tempY] = this.shipsCords[idx];
    for (let i = 0; i < size; i++) {
      this.testMatrix[tempX][tempY] = 'ship';
      if (isHorizontal) { // if ship direction is horizontal
        tempY++;
      }
      else { // if ship direction is vertical
        tempX++;
      }
    }
    return true;
  } 

  markSunkShipNeighbors(x, y) {
    // Visited matrix
    let visited = Array.from({length: this.GAME_BOARD_SIZE}, () => Array(this.GAME_BOARD_SIZE).fill(false)); 
    // Neighbor indices array
    const neighborXArr = [-1, -1, -1, 1, 1, 1, 0, 0]; 
    const neighborYArr = [-1, 0, 1, -1, 0, 1, -1, 1]; 
    // Make a coordinates queue and push x, y to it
    let coordQueue = [];
    coordQueue.push([x, y]);

    while (coordQueue.length !== 0) {
      // Get the first coordinates in the queue
      const [curX, curY] = coordQueue.shift();
      if (!visited[curX][curY]) {
        visited[curX][curY] = true;
        for (let i = 0; i < neighborXArr.length; i++) {
          const neighborX = curX + neighborXArr[i];
          const neighborY = curY + neighborYArr[i];
          if (this.isCoordValid(neighborX, neighborY)) {
            // empty cell case
            if (this.gameBoardMatrix[neighborX][neighborY] === null) {
              // mark it with miss
              this.gameBoardMatrix[neighborX][neighborY] = false;
            }
            // sunk ship cell case
            else if (this.gameBoardMatrix[neighborX][neighborY] === true) {
              // push these coordinates to queue
              coordQueue.push([neighborX, neighborY]);
            }
          }
        }
      }
    }
  }

  // Main functions
  placeShip(x, y) {
    if (this.checkShipCoord(x, y)) {
      // Get idx, size, and isHorizontal information of current ship
      const idx = this.shipsCords.length - 1;
      const size = this.shipsSizes[idx];
      const isHorizontal = this.shipsHorizontal[idx];
      // Create a new ship and push it to shipsArr
      this.shipsArr.push(new Ship(size));
      const curShip = this.shipsArr[idx];
      // Put the ship object in the gameBoardMatrix
      for (let i = 0; i < size; i++) {
        this.gameBoardMatrix[x][y] = curShip;
        if (isHorizontal) { // if ship direction is horizontal
          y++;
        }
        else { // if ship direction is vertical
          x++;
        }
      }
      return true;
    }
    return false;
  }

  changeAxis() {
    this.shipsHorizontal = this.shipsHorizontal.map(axis => !axis);
  }

  randomizeShips() {
    for (let i = 0; i < this.shipsSizes.length; i++) {
      // Random direction
      this.shipsHorizontal[i] = this.getRandomBool();
      // Generate random coordinates
      let isPlaced = false;
      while (!isPlaced) {
        const x = Math.floor(Math.random() * this.GAME_BOARD_SIZE);
        const y = Math.floor(Math.random() * this.GAME_BOARD_SIZE);
        isPlaced = this.placeShip(x, y);
      }
    }
  }

  receiveAttack(x, y) {
    if (!this.isCoordValid(x, y)) {
      return null;
    }
    // Case 1: hit
    if (this.gameBoardMatrix[x][y] instanceof Ship) {
      // Call hit() on ship object
      this.gameBoardMatrix[x][y].hit();
      // If ship is sunk, mark its neighbor cells with miss
      if (this.gameBoardMatrix[x][y].isSunk()) {
        this.markSunkShipNeighbors(x, y);
      }
      this.gameBoardMatrix[x][y] = true; // true represents a hit cell
      //
      return true;
    }
    // Case 2: miss
    else if (this.gameBoardMatrix[x][y] === null) {
      this.gameBoardMatrix[x][y] = false; // false represents a miss cell
      return false;
    }
  }

  getIsShipPlacedArr() {
    let isPlacedArr = Array(5).fill(false);
    for (let i = 0; i < this.shipsArr.length; i++) {
      isPlacedArr[i] = true;
    }
    return isPlacedArr;
  }

  isAllShipsPlaced() {
    return this.shipsArr.length === this.shipsSizes.length;
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