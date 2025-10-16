// Board cell functions
function editCellType(boardElem, cellIndex, type) {
  // Get the current cell by index
  const curCell = boardElem.children[cellIndex];
  // Remove 'empty' type from class list
  curCell.classList.remove('empty');
  // Add the type to the class list
  curCell.classList.add(type);
}
function isCellEmptyOrShip(cell) {
  return cell.classList.contains('empty') || cell.classList.contains('ship');
}

function replaceCellClass(cell, currentClass, newClass) {
  cell.classList.replace(currentClass, newClass);
}

export {
  editCellType,
  isCellEmptyOrShip,
  replaceCellClass,
};