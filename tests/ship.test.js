import Ship from '../modules/ship';

test("Ship with length = 2", () => {
  const ship = new Ship(2);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("Ship with length = 3 and hits = 3", () => {
  const ship = new Ship(3, 3);
  expect(ship.isSunk()).toBe(true);
});

test("Ship with length = 3 and hits = 2", () => {
  const ship = new Ship(3, 2);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("Ship with invalid length (-1)", () => {
  const ship = new Ship(-1);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});