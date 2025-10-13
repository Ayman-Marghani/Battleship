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

function createCell(type, parentElem) {
  // Get the last cell before the new one
  const lastCell = parentElem.lastElementChild;
  let newIndex = 0; // In case the new cell is the first cell
  if (lastCell) {
    // Calculate the new cell index
    newIndex = Number(lastCell.getAttribute('index')) + 1;
  }
  const newCellElement = document.createElement('div');
  newCellElement.setAttribute('index', newIndex);
  newCellElement.classList.add(...['cell', type]);
  parentElem.appendChild(newCellElement);
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

function renderBoard(boardElem) {
  return (playerObj) => {
    const gamebaord = playerObj.getBoard();

    gamebaord.forEach(row => {
      row.forEach(item => {
        if (item === 'X') { // Ship cell
          createCell('ship', boardElem);
        }
        else if (item === 'H') { // Hit cell
          createCell('hit', boardElem);
        }
        else if (item === 'M') { // Miss cell
          createCell('miss', boardElem);
        }
        else { // Empty cell
          createCell('empty', boardElem);
        }
      });
    });
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
function addEventListenerFirstBoard(handleAttackFunc) {
  firstBoardElem.addEventListener('click', handleAttackFunc);
}

function addEventListenerSecondBoard(handleAttackFunc) {
  secondBoardElem.addEventListener('click', handleAttackFunc);
}

function removeEventListenerFirstBoard(handleAttackFunc) {
  firstBoardElem.removeEventListener('click', handleAttackFunc);
}

function removeEventListenerSecondBoard(handleAttackFunc) {
  secondBoardElem.removeEventListener('click', handleAttackFunc);
}

// Board cell functions
function isCellEmptyOrShip(cell) {
  return cell.classList.contains('empty') || cell.classList.contains('ship');
}

function replaceCellClass(cell, currentClass, newClass) {
  cell.classList.replace(currentClass, newClass);
}

export {
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