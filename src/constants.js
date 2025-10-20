export const BOARD_SIZE = 10; // 10x10 grid
const SHIPS = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
};
export const SHIP_NAMES = Object.keys(SHIPS);
export const SHIP_LENGTHS = Object.values(SHIPS);
export const SHIPS_COUNT = SHIPS.length;