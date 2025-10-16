import {editCellType} from './boardCellFunctions';
import {
  removeChildren,
  hideElem,
  showElem,
  changeFlexDirection,
  renderEmptyBoard,
  addSideShipsToDOM,
  showSideShips,
} from './helperFunctions';
// DOM elements 
const bannerElem = document.querySelector(".banner");
const shipPlacementBtns = document.querySelectorAll(".ship-placement-btns");
// Screens
const gameModeScreen = document.querySelector(".game-mode-btns");
const gameScreen = document.querySelector(".game-screen");
// Player Names form
const playerNamesForm = document.querySelector(".player-names-form");
const firstNameInput = document.getElementById("fname");
const secondNameInput = document.getElementById("sname");
const secondNameContainer = document.querySelector(".second-player-name-input");
// First board 
const shipsContainerFirst = document.querySelector(".first-side-ships");
const firstBoardElem = document.querySelector(".first-board");
// Second board 
const shipsContainerSecond = document.querySelector(".second-side-ships");
const secondBoardElem = document.querySelector(".second-board");
// Play again button
const playAgainBtn = document.querySelector(".play-again-btn");

// # Helper functions
function showShipPlacementBtns() {
  shipPlacementBtns.forEach((btn) => {
    showElem(btn);
  })
}

// # Main functions
function renderBanner(text) {
  bannerElem.textContent = text;
}

// ## Render Screens functions
function initialRender() {
  renderEmptyBoard(firstBoardElem);
  renderEmptyBoard(secondBoardElem);
  // Render ships on the side of each board
  addSideShipsToDOM(shipsContainerFirst);
  addSideShipsToDOM(shipsContainerSecond);
}
function resetDOM() {
  // Remove all cells in the game boards
  removeChildren(firstBoardElem);
  removeChildren(secondBoardElem);
  // Render boards and ship placement buttons
  renderEmptyBoard(firstBoardElem);
  renderEmptyBoard(secondBoardElem);
  showShipPlacementBtns();
  // Render ships on the side of boards
  showSideShips(shipsContainerFirst);
  showSideShips(shipsContainerSecond);
  // Hide play again button
  hideElem(playAgainBtn);
  // Hide all screens
  hideElem(gameModeScreen);
  hideElem(gameScreen);
  hideElem(playerNamesForm);
}
function renderGameModeScreen() {
  // Hide other screens
  hideElem(gameScreen);
  hideElem(playerNamesForm);
  // Show game mode screen
  renderBanner('Choose Game Mode');
  showElem(gameModeScreen);
}
function renderGameScreen() {
  // Hide other screens
  hideElem(gameModeScreen);
  hideElem(playerNamesForm);
  // Show game screen and ship placement buttons
  showElem(gameScreen);
  showShipPlacementBtns();
}
function showPlayAgainBtn() {
  showElem(playAgainBtn);
}

// ## Player names form functions
function renderPlayerNamesFormScreen(isComputerMode) {
  // If computer mode hide second input div and make it not 
  if (isComputerMode) {
    secondNameInput.required = false;
    hideElem(secondNameContainer);
  }
  // else show it and make it required
  else {
    secondNameInput.required = true;
    showElem(secondNameContainer);
  }
  // Hide other screens
  hideElem(gameModeScreen);
  hideElem(gameScreen);
  // Show player names form screen
  renderBanner('Enter Player(s) Name');
  showElem(playerNamesForm);
}
function getFirstPlayerName() {
  return firstNameInput.value.trim();
}
function getSecondPlayerName() {
  return secondNameInput.value.trim();
}

// ## Side ships functions
function renderSideShips(shipsContainerElem) {
  return (shipsPlacedArr) => {
    for (let i = 0; i < shipsPlacedArr.length; i++) {
      const shipElem = shipsContainerElem.children[i];
      // If ship is placed on board hide it from the side
      if (shipsPlacedArr[i]) {
        hideElem(shipElem);
      }
      else {
        showElem(shipElem);
      }
    }
  };
}
const renderSideShipsFirst = renderSideShips(shipsContainerFirst);
const renderSideShipsSecond = renderSideShips(shipsContainerSecond);

function changeSideShipsAxis(shipsContainerElem) {
  return () => {
    changeFlexDirection(shipsContainerElem);
    for (const ship of shipsContainerElem.children) {
      changeFlexDirection(ship);
    }
  };
}
const changeSideShipsAxisFirst = changeSideShipsAxis(shipsContainerFirst);
const changeSideShipsAxisSecond = changeSideShipsAxis(shipsContainerSecond);

// ## Game board functions
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
const renderFirstBoard = renderBoard(firstBoardElem);
const renderSecondBoard = renderBoard(secondBoardElem);

function hideBoard(boardElem) {
  return () => {
    for (const cell of boardElem.children) {
      cell.classList.add('hidden');
    }
  };
}
const hideFirstBoard = hideBoard(firstBoardElem);
const hideSecondBoard = hideBoard(secondBoardElem);

function showBoard(boardElem) {
  return () => {
    for (const cell of boardElem.children) {
      cell.classList.remove('hidden');
    }
  };
}
const showFirstBoard = showBoard(firstBoardElem);
const showSecondBoard = showBoard(secondBoardElem);

// ## Ship placement buttons functions
function hideShipPlacementBtns() {
  shipPlacementBtns.forEach((btn) => {
    hideElem(btn);
  })
}

export {
  renderBanner,
  initialRender,
  resetDOM,
  renderGameModeScreen,
  renderGameScreen,
  showPlayAgainBtn,
  renderPlayerNamesFormScreen,
  getFirstPlayerName,
  getSecondPlayerName,
  renderSideShipsFirst,
  renderSideShipsSecond,
  changeSideShipsAxisFirst,
  changeSideShipsAxisSecond,
  renderFirstBoard,
  renderSecondBoard,
  hideFirstBoard,
  hideSecondBoard,
  showFirstBoard,
  showSecondBoard,
  hideShipPlacementBtns,
};