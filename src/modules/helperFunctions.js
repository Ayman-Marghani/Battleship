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
    elem.classList.add('hidden-elem');
  }
}
function showElem(elem) {
  if (elem) {
    elem.classList.remove('hidden-elem');
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
  if (!shipsContainerElem) return;
  
  const shipTitleArr = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];
  const shipSizeArr = [5, 4, 3, 3, 2];
  
  for (let i = 0; i < shipSizeArr.length; i++) {
    const size = shipSizeArr[i];
    const title = shipTitleArr[i];
    
    // Create ship-box container
    const shipBox = document.createElement('div');
    shipBox.classList.add('ship-box');
    // Create ship-info section
    const shipInfo = document.createElement('div');
    shipInfo.classList.add('ship-info');
    
    const shipTitle = document.createElement('div');
    shipTitle.classList.add('ship-title');
    shipTitle.textContent = title;
    
    const shipSize = document.createElement('div');
    shipSize.classList.add('ship-size');
    shipSize.textContent = size;
    
    shipInfo.appendChild(shipTitle);
    shipInfo.appendChild(shipSize);   
    // Create ship-elem section (the cells container)
    const shipElem = document.createElement('div');
    shipElem.classList.add('ship-elem');
    // Add ship cells
    for (let j = 0; j < size; j++) {
      const cell = document.createElement('div');
      cell.classList.add('side-ship-cell');
      shipElem.appendChild(cell);
    }
    // Assemble the ship-box
    shipBox.appendChild(shipInfo);
    shipBox.appendChild(shipElem);
    
    // Add to container
    shipsContainerElem.appendChild(shipBox);
  }
}
function showSideShips(shipsContainerElem) {
  if (shipsContainerElem) {
    for (const shipElem of shipsContainerElem.children) {
      shipElem.classList.remove('placed');
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
  renderEmptyBoard,
  addSideShipsToDOM,
  showSideShips,
  editCellType,
  replaceCellClass,
  isEmptyOrShipCell,
  getCellCoords,
};  