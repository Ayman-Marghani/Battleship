import Player from "./player";

test("player", () => {
  const p1 = new Player(false, "P1");
  const p2 = new Player(false, "P2");

  // p1 isLoser function and name
  expect(p1.isLoser()).toBe(false);
  expect(p1.name).toBe("P1");
  // p2 isLoser function and name
  expect(p2.isLoser()).toBe(false);
  expect(p2.name).toBe("P2");

  // Test receiveAttack function for both players
  expect(p1.receiveAttack(0, 2)).toBe(true);
  expect(p1.receiveAttack(0, 0)).toBe(false);

  expect(p2.receiveAttack(0, 2)).toBe(true);
  expect(p2.receiveAttack(0, 0)).toBe(false);

  // Attack all p1 ships
  p1.receiveAttack(0, 3);
  p1.receiveAttack(0, 4);
  p1.receiveAttack(0, 8);
  p1.receiveAttack(0, 9);
  p1.receiveAttack(3, 2);
  p1.receiveAttack(3, 5);
  p1.receiveAttack(3, 8);
  p1.receiveAttack(4, 8);
  p1.receiveAttack(5, 0);
  p1.receiveAttack(5, 1);
  p1.receiveAttack(5, 2);
  p1.receiveAttack(5, 3);
  p1.receiveAttack(5, 6);
  p1.receiveAttack(7, 7);
  p1.receiveAttack(8, 0);
  p1.receiveAttack(8, 4);
  p1.receiveAttack(8, 7);  
  p1.receiveAttack(9, 4);
  p1.receiveAttack(9, 7);
  expect(p1.isLoser()).toBe(true);

  expect(p2.isLoser()).toBe(false);
});