import Gameboard from "./gameboard";

test("Test Gameboard with hit and miss cases", () => {
  const game = new Gameboard();
  // let matrix = game.display();

  expect(game.display()).toEqual([ 
    [ '-', '-', 'X', 'X', 'X', '-', '-', '-', 'X', 'X' ],
    [ '-', '-', '-', '-', '-', '-', '-', '-', '-', '-' ],
    [ '-', '-', '-', '-', '-', '-', '-', '-', '-', '-' ],
    [ '-', '-', 'X', '-', '-', 'X', '-', '-', 'X', '-' ],
    [ '-', '-', '-', '-', '-', '-', '-', '-', 'X', '-' ],
    [ 'X', 'X', 'X', 'X', '-', '-', 'X', '-', '-', '-' ],
    [ '-', '-', '-', '-', '-', '-', '-', '-', '-', '-' ],
    [ '-', '-', '-', '-', '-', '-', '-', 'X', '-', '-' ],
    [ 'X', '-', '-', '-', 'X', '-', '-', 'X', '-', '-' ],
    [ '-', '-', '-', '-', 'X', '-', '-', 'X', '-', '-' ]
  ]);
  expect(game.isAllShipsSunk()).toBe(false);

  // Miss case
  game.receiveAttack(0, 0);
  expect(game.display()).toEqual([ 
    [ 'M', '-', 'X', 'X', 'X', '-', '-', '-', 'X', 'X' ],
    [ '-', '-', '-', '-', '-', '-', '-', '-', '-', '-' ],
    [ '-', '-', '-', '-', '-', '-', '-', '-', '-', '-' ],
    [ '-', '-', 'X', '-', '-', 'X', '-', '-', 'X', '-' ],
    [ '-', '-', '-', '-', '-', '-', '-', '-', 'X', '-' ],
    [ 'X', 'X', 'X', 'X', '-', '-', 'X', '-', '-', '-' ],
    [ '-', '-', '-', '-', '-', '-', '-', '-', '-', '-' ],
    [ '-', '-', '-', '-', '-', '-', '-', 'X', '-', '-' ],
    [ 'X', '-', '-', '-', 'X', '-', '-', 'X', '-', '-' ],
    [ '-', '-', '-', '-', 'X', '-', '-', 'X', '-', '-' ]
  ]);

  // Hit case
  game.receiveAttack(0, 2);
  expect(game.display()).toEqual([ 
    [ 'M', '-', 'H', 'X', 'X', '-', '-', '-', 'X', 'X' ],
    [ '-', '-', '-', '-', '-', '-', '-', '-', '-', '-' ],
    [ '-', '-', '-', '-', '-', '-', '-', '-', '-', '-' ],
    [ '-', '-', 'X', '-', '-', 'X', '-', '-', 'X', '-' ],
    [ '-', '-', '-', '-', '-', '-', '-', '-', 'X', '-' ],
    [ 'X', 'X', 'X', 'X', '-', '-', 'X', '-', '-', '-' ],
    [ '-', '-', '-', '-', '-', '-', '-', '-', '-', '-' ],
    [ '-', '-', '-', '-', '-', '-', '-', 'X', '-', '-' ],
    [ 'X', '-', '-', '-', 'X', '-', '-', 'X', '-', '-' ],
    [ '-', '-', '-', '-', 'X', '-', '-', 'X', '-', '-' ]
  ]);
  expect(game.isAllShipsSunk()).toBe(false);

  // Attack all ships
  game.receiveAttack(0, 3);
  game.receiveAttack(0, 4);
  game.receiveAttack(0, 8);
  game.receiveAttack(0, 9);

  game.receiveAttack(3, 2);
  game.receiveAttack(3, 5);
  game.receiveAttack(3, 8);

  game.receiveAttack(4, 8);
  
  game.receiveAttack(5, 0);
  game.receiveAttack(5, 1);
  game.receiveAttack(5, 2);
  game.receiveAttack(5, 3);
  game.receiveAttack(5, 6);

  game.receiveAttack(7, 7);

  game.receiveAttack(8, 0);
  game.receiveAttack(8, 4);
  game.receiveAttack(8, 7);
  expect(game.isAllShipsSunk()).toBe(false);

  game.receiveAttack(9, 4);
  game.receiveAttack(9, 7);
  expect(game.display()).toEqual([ 
    [ 'M', '-', 'H', 'H', 'H', '-', '-', '-', 'H', 'H' ],
    [ '-', '-', '-', '-', '-', '-', '-', '-', '-', '-' ],
    [ '-', '-', '-', '-', '-', '-', '-', '-', '-', '-' ],
    [ '-', '-', 'H', '-', '-', 'H', '-', '-', 'H', '-' ],
    [ '-', '-', '-', '-', '-', '-', '-', '-', 'H', '-' ],
    [ 'H', 'H', 'H', 'H', '-', '-', 'H', '-', '-', '-' ],
    [ '-', '-', '-', '-', '-', '-', '-', '-', '-', '-' ],
    [ '-', '-', '-', '-', '-', '-', '-', 'H', '-', '-' ],
    [ 'H', '-', '-', '-', 'H', '-', '-', 'H', '-', '-' ],
    [ '-', '-', '-', '-', 'H', '-', '-', 'H', '-', '-' ]
  ]);
  expect(game.isAllShipsSunk()).toBe(true);
});