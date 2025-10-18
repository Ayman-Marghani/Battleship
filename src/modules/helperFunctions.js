const GAME_BOARD_SIZE = 10;
// # General functions
function isCoordValid(x, y) {
  // Invalid coordinates (out of board)
  if (x < 0 || x >= GAME_BOARD_SIZE || y < 0 || y >= GAME_BOARD_SIZE) {
    return false;
  }
  return true;
}
// # DOM functions
// ## General DOM functions
function removeChildren(elem) {
  while (elem && elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}
function hideElem(elem) {
  if (elem) {
    if (elem.classList.contains('ship-elem')) {
      elem.classList.add('hidden-ship');
    }
    else {
      elem.classList.add('hidden-elem');
    }
  }
}
function showElem(elem) {
  if (elem) {
    if (elem.classList.contains('ship-elem')) {
      elem.classList.remove('hidden-ship');
    }
    else {
      elem.classList.remove('hidden-elem');
    }
  }
}
function changeFlexDirection(elem) {
  if (elem) {
    if (elem.style.flexDirection === 'column') {
      elem.style.flexDirection = 'row';
    }
    else {
      elem.style.flexDirection = 'column';
    }
  }
}
// ## Board functions
// ### Game board functions
function renderEmptyBoard(boardElem) {
  if (boardElem) {
    const cellsCount = 100;
    for (let i = 0; i < cellsCount; i++) {
      const newCellElement = document.createElement('div');
      newCellElement.setAttribute('index', i);
      newCellElement.classList.add('cell');
      boardElem.appendChild(newCellElement);
    }
  }
}
// ### Side Ships functions
function addSideShipsToDOM(shipsContainerElem) {
  if (shipsContainerElem) {
    shipsContainerElem.style.flexDirection = 'column';
    const shipsSizes = [5, 4, 3, 3, 2];
    for (const size of shipsSizes) {
      const newShipElem = document.createElement('div');
      newShipElem.classList.add('ship-elem');
      newShipElem.style.flexDirection = 'row';
      // Ship Cells
      for (let i = 0; i < size; i++) {
        const newCellElement = document.createElement('div');
        newCellElement.classList.add(...['cell', 'ship']);
        newShipElem.appendChild(newCellElement);
      }
      shipsContainerElem.appendChild(newShipElem);
    }
  }
}
function showSideShips(shipsContainerElem) {
  if (shipsContainerElem) {
    for (const shipElem of shipsContainerElem.children) {
      showElem(shipElem);
    }
  }
}
// ### Board cell functions
function editCellType(boardElem, cellIndex, type) {
  // Get the current cell by index
  const curCell = boardElem.children[cellIndex];
  // Remove 'empty' type from class list
  curCell.classList.remove('empty');
  // Add the type to the class list
  curCell.classList.add(type);
}
function replaceCellClass(cell, currentClass, newClass) {
  cell.classList.replace(currentClass, newClass);
}
function isEmptyOrShipCell(cell) {
  console.log("checking isEmptyOrShipCell: ", cell);
  const emptyOrShip = cell.classList.contains('empty') || cell.classList.contains('ship');
  const hitOrMiss = cell.classList.contains('hit') || cell.classList.contains('miss');
  return (emptyOrShip) && !hitOrMiss;
}
// Returns the x and y coordinates of a cell based on its index.
function getCellCoords(cell) {
  // Get index of cell
  const index = Number(cell.getAttribute('index'));
  // Calc x and y coordinates
  const x = Math.floor(index / GAME_BOARD_SIZE);
  const y = index % GAME_BOARD_SIZE;
  return [x, y];
}

export {
  isCoordValid,
  removeChildren,
  hideElem,
  showElem,
  changeFlexDirection,
  renderEmptyBoard,
  addSideShipsToDOM,
  showSideShips,
  editCellType,
  replaceCellClass,
  isEmptyOrShipCell,
  getCellCoords,
};  