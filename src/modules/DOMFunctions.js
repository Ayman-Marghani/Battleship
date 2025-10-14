// DOM elements 
const firstBoardElem = document.querySelector(".first-board");
const secondBoardElem = document.querySelector(".second-board");
const currentPlayerBanner = document.querySelector(".current-player");

// Helper functions
function removeChildren(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}

function editCellType(boardElem, cellIndex, type) {
  // Get the current cell by index
  const curCell = boardElem.children[cellIndex];
  // Remove 'empty' type from class list
  curCell.classList.remove('empty');
  // Add the type to the class list
  curCell.classList.add(type);
}

function renderEmptyBoard(boardElem) {
  const cellsCount = 100;
  for (let i = 0; i < cellsCount; i++) {
    const newCellElement = document.createElement('div');
    newCellElement.setAttribute('index', i);
    newCellElement.classList.add('cell');
    boardElem.appendChild(newCellElement);
  }
}

// Main functions
function renderPlayerBanner(text) {
  currentPlayerBanner.textContent = text;
}

// Game board functions
function removeBoardsCells() {
  removeChildren(firstBoardElem);
  removeChildren(secondBoardElem);
}

function initialRender() {
  renderEmptyBoard(firstBoardElem);
  renderEmptyBoard(secondBoardElem);
}

function renderBoard(boardElem) {
  return (playerObj) => {
    const gamebaord = playerObj.getBoard();
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        // Calculate cell index
        const cellIndex = i * 10 + j;
        if (gamebaord[i][j] === 'X') { // Ship cell
          editCellType(boardElem, cellIndex, 'ship');
        }
        else if (gamebaord[i][j] === 'H') { // Hit cell
          editCellType(boardElem, cellIndex, 'hit');
        }
        else if (gamebaord[i][j] === 'M') { // Miss cell
          editCellType(boardElem, cellIndex, 'miss');
        }
        else { // Empty cell
          editCellType(boardElem, cellIndex, 'empty');
        }
      }
    }
  };
}

function hideBoard(boardElem) {
  return () => {
    for (const cell of boardElem.children) {
      cell.classList.add('hidden');
    }
  };
}

function showBoard(boardElem) {
  return () => {
    for (const cell of boardElem.children) {
      cell.classList.remove('hidden');
    }
  };
}

const renderFirstBoard = renderBoard(firstBoardElem);
const renderSecondBoard = renderBoard(secondBoardElem);

const hideFirstBoard = hideBoard(firstBoardElem);
const hideSecondBoard = hideBoard(secondBoardElem);

const showFirstBoard = showBoard(firstBoardElem);
const showSecondBoard = showBoard(secondBoardElem);

// Event listeners functions
function addEventListenerFirstBoard(handleClickFunc) {
  firstBoardElem.addEventListener('click', handleClickFunc);
}

function addEventListenerSecondBoard(handleClickFunc) {
  secondBoardElem.addEventListener('click', handleClickFunc);
}

function removeEventListenerFirstBoard(handleClickFunc) {
  firstBoardElem.removeEventListener('click', handleClickFunc);
}

function removeEventListenerSecondBoard(handleClickFunc) {
  secondBoardElem.removeEventListener('click', handleClickFunc);
}

// Board cell functions
function isCellEmptyOrShip(cell) {
  return cell.classList.contains('empty') || cell.classList.contains('ship');
}

function replaceCellClass(cell, currentClass, newClass) {
  cell.classList.replace(currentClass, newClass);
}

export {
  initialRender,
  renderPlayerBanner,
  removeBoardsCells,
  renderFirstBoard,
  renderSecondBoard,
  hideFirstBoard,
  hideSecondBoard,
  showFirstBoard,
  showSecondBoard,
  addEventListenerFirstBoard,
  addEventListenerSecondBoard,
  removeEventListenerFirstBoard,
  removeEventListenerSecondBoard,
  isCellEmptyOrShip,
  replaceCellClass,
};