export const BOARD_SIZE = 10; // 10x10 grid
const SHIPS = {
  Carrier: 5,
  Battleship: 4,
  Cruiser: 3,
  Submarine: 3,
  Destroyer: 2,
};
export const SHIP_NAMES = Object.keys(SHIPS);
export const SHIP_LENGTHS = Object.values(SHIPS);