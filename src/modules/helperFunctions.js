import { BOARD_SIZE, SHIP_NAMES, SHIP_LENGTHS, SHIPS_COUNT } from "../constants";

/************************************************************/
/* Validation Functions */
/************************************************************/

/**
 * Checks if coordinates are within the board boundaries.
 * @param {number} x - Row coordinate
 * @param {number} y - Column coordinate
 * @returns {boolean} True if valid, false if out of bounds
 */
function isCoordValid(x, y) {
  if (x < 0 || x >= BOARD_SIZE || y < 0 || y >= BOARD_SIZE) {
    return false;
  }
  return true;
}

/************************************************************/
/* DOM Manipulation - General */
/************************************************************/

/**
 * Removes all child elements from a parent element.
 * @param {HTMLElement} elem - Parent element to clear
 */
function removeChildren(elem) {
  while (elem && elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}

/**
 * Hides an element by adding 'hidden-elem' class.
 * @param {HTMLElement} elem - Element to hide
 */
function hideElem(elem) {
  if (elem) {
    elem.classList.add('hidden-elem');
  }
}

/**
 * Shows a previously hidden element by removing 'hidden-elem' class.
 * @param {HTMLElement} elem - Element to show
 */
function showElem(elem) {
  if (elem) {
    elem.classList.remove('hidden-elem');
  }
}

/************************************************************/
/* Board Rendering */
/************************************************************/

/**
 * Creates and renders a 10x10 grid of empty cells.
 * @param {HTMLElement} boardElem - Board container element
 */
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

/************************************************************/
/* Fleet Panel - Ship Cards */
/************************************************************/

/**
 * Generates and adds all ship cards to the fleet panel.
 * Creates ship-box elements with title, size, and visual cells.
 * @param {HTMLElement} shipsContainerElem - Fleet container element
 */
function addSideShipsToDOM(shipsContainerElem) {
  if (!shipsContainerElem) return;
  
  for (let i = 0; i < SHIPS_COUNT; i++) {
    const size = SHIP_LENGTHS[i];
    const title = SHIP_NAMES[i];
    
    // Create ship-box container
    const shipBox = document.createElement('div');
    shipBox.classList.add('ship-box');
    
    // Create ship-info section (title + size)
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
    
    // Create ship-elem section (visual cells)
    const shipElem = document.createElement('div');
    shipElem.classList.add('ship-elem');
    
    // Add ship cells
    for (let j = 0; j < size; j++) {
      const cell = document.createElement('div');
      cell.classList.add('side-ship-cell');
      shipElem.appendChild(cell);
    }
    
    // Assemble ship-box
    shipBox.appendChild(shipInfo);
    shipBox.appendChild(shipElem);
    
    shipsContainerElem.appendChild(shipBox);
  }
}

/**
 * Resets all ships in fleet to unplaced state.
 * Removes 'placed' class from all ship cards.
 * @param {HTMLElement} shipsContainerElem - Fleet container element
 */
function showSideShips(shipsContainerElem) {
  if (shipsContainerElem) {
    for (const shipElem of shipsContainerElem.children) {
      shipElem.classList.remove('placed');
    }
  }
}

/************************************************************/
/* Cell State Management */
/************************************************************/

/**
 * Updates a cell's visual state by adding a type class.
 * Removes 'empty' class before adding new type.
 * @param {HTMLElement} boardElem - Board container
 * @param {number} cellIndex - Index of cell to update (0-99)
 * @param {string} cellType - Cell type: 'ship', 'hit', 'miss', etc.
 */
function editCellType(boardElem, cellIndex, cellType) {
  const curCell = boardElem.children[cellIndex];
  curCell.classList.remove('empty');
  curCell.classList.add(cellType);
}

/**
 * Replaces one class with another on a cell element.
 * @param {HTMLElement} cellElem - Cell element to modify
 * @param {string} currentClass - Class to remove
 * @param {string} newClass - Class to add
 */
function replaceCellClass(cellElem, currentClass, newClass) {
  cellElem.classList.replace(currentClass, newClass);
}

/**
 * Checks if a cell can be attacked (empty or has ship, not already hit/miss).
 * @param {HTMLElement} cellElem - Cell element to check
 * @returns {boolean} True if cell can be attacked
 */
function isEmptyOrShipCell(cellElem) {
  const emptyOrShip = cellElem.classList.contains('empty') || cellElem.classList.contains('ship');
  const hitOrMiss = cellElem.classList.contains('hit') || cellElem.classList.contains('miss');
  return emptyOrShip && !hitOrMiss;
}

/************************************************************/
/* Coordinate Conversion */
/************************************************************/

/**
 * Converts a cell's linear index to 2D board coordinates.
 * @param {HTMLElement} cellElem - Cell element with 'index' attribute
 * @returns {[number, number]} Array [x, y] where x is row, y is column
 */
function getCellCoords(cellElem) {
  const index = Number(cellElem.getAttribute('index'));
  const x = Math.floor(index / BOARD_SIZE);
  const y = index % BOARD_SIZE;
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