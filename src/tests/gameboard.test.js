import Gameboard from "../modules/gameboard";
import Ship from "../modules/ship";

describe("Gameboard Class", () => {
  let game;

  beforeEach(() => {
    game = new Gameboard();
  });

  test("should initialize with empty board", () => {
    const emptyBoard = Array.from({ length: 10 }, () => Array(10).fill('-'));
    expect(game.testMatrix).toEqual(emptyBoard);
  });

  test("should place a ship successfully when coordinates are valid", () => {
    const placed = game.placeShip(0, 0);
    expect(placed).toBe(true);
    for (let i = 0; i < 5; i++) {
      expect(game.gameBoardMatrix[0][i]).toBeInstanceOf(Ship);
    }
  });

  test("should not place ship if collision or invalid position", () => {
    game.placeShip(0, 0);
    const failed = game.placeShip(0, 0);
    expect(failed).toBe(false);
  });

  test("should register hit correctly", () => {
    game.placeShip(0, 0);
    const hitResult = game.receiveAttack(0, 0);
    expect(hitResult).toBe(true);
    expect(game.gameBoardMatrix[0][0]).toBe(true);
  });

  test("should register miss correctly", () => {
    game.placeShip(0, 0);
    const missResult = game.receiveAttack(5, 5);
    expect(missResult).toBe(false);
    expect(game.gameBoardMatrix[5][5]).toBe(false);
  });

  test("should detect when all ships are sunk", () => {
    game.placeShip(0, 0);
    const ship = game.shipsArr[0];
    for (let i = 0; i < ship.length; i++) {
      game.receiveAttack(0, i);
    }
    expect(ship.isSunk()).toBe(true);
    expect(game.isAllShipsSunk()).toBe(true);
  });

  test("should display correct board symbols", () => {
    game.placeShip(0, 0);
    game.receiveAttack(0, 0);
    game.receiveAttack(1, 1);

    const displayMatrix = game.display();

    expect(displayMatrix[0][0]).toBe("H");
    expect(displayMatrix[1][1]).toBe("M");
    expect(displayMatrix[0][1]).toBe("X");
  });

  // 🔹 NEW TESTS FOR changeAxis()
  test("should toggle all ships’ orientation", () => {
    // Initially all true (horizontal)
    expect(game.shipsHorizontal.every(val => val === true)).toBe(true);

    // First toggle → all become false
    game.changeAxis();
    expect(game.shipsHorizontal.every(val => val === false)).toBe(true);

    // Second toggle → all become true again
    game.changeAxis();
    expect(game.shipsHorizontal.every(val => val === true)).toBe(true);
  });

  test("should allow placing ships vertically after changeAxis()", () => {
    game.changeAxis(); // make all ships vertical
    const placed = game.placeShip(0, 0);
    expect(placed).toBe(true);

    const ship = game.shipsArr[0];
    for (let i = 0; i < ship.length; i++) {
      expect(game.gameBoardMatrix[i][0]).toBeInstanceOf(Ship); // vertical placement
    }
  });
});
