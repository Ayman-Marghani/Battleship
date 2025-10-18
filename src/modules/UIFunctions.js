// Import Helper functions
import {
  removeChildren,
  hideElem,
  showElem,
  changeFlexDirection,
  renderEmptyBoard,
  addSideShipsToDOM,
  showSideShips,
  editCellType,
} from './helperFunctions';

// DOM elements 
const bannerElem = document.querySelector(".banner");
const shipPlacementBtns = document.querySelectorAll(".ship-placement-btn");
// Screens
const gameModeScreen = document.querySelector(".game-mode-screen");
const gameScreen = document.querySelector(".game-screen");
// Player Names form
const playerNamesForm = document.querySelector(".player-names-form");
const firstNameInput = document.getElementById("fname");
const secondNameInput = document.getElementById("sname");
const secondNameContainer = document.querySelector(".second-player-name-input");
// First board 
const shipsContainerFirst = document.querySelector(".first-side-ships");
const firstBoardElem = document.querySelector(".first-board");
const firstBoardBanner = document.querySelector(".first-board-title");
// Second board 
const shipsContainerSecond = document.querySelector(".second-side-ships");
const secondBoardElem = document.querySelector(".second-board");
const secondBoardBanner = document.querySelector(".second-board-title");
// Play again button
const playAgainBtn = document.querySelector(".play-again-btn");

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
  // Reset player names form input values
  firstNameInput.value = '';
  secondNameInput.value = '';
  // Render boards and ship placement buttons
  renderEmptyBoard(firstBoardElem);
  renderEmptyBoard(secondBoardElem);
  shipPlacementBtns.forEach(showElem);
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
  renderBanner('Select Game Mode');
  showElem(gameModeScreen);
}
function renderGameScreen(isComputerMode) {
  // Hide other screens
  hideElem(gameModeScreen);
  hideElem(playerNamesForm);
  // Show game screen and ship placement buttons
  showElem(gameScreen);
  // Separate first player buttons from second player buttons
  const btnsArr = Array.from(shipPlacementBtns); 
  const firstPlayerShipPlacementBtns = btnsArr.slice(0, 2);      
  const secondPlayerShipPlacementBtns  = btnsArr.slice(-2); 
  // Show first player buttons 
  firstPlayerShipPlacementBtns.forEach(showElem);
  // If computer mode hide second player buttons, else show them
  if (isComputerMode) {
    secondPlayerShipPlacementBtns.forEach(hideElem);
  }
  else {
    secondPlayerShipPlacementBtns.forEach(showElem);
  }
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
  renderBanner('');
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
  const GAME_BOARD_SIZE = 10;
  return (playerObj) => {
    const gamebaord = playerObj.getBoard();
    for (let i = 0; i < GAME_BOARD_SIZE; i++) {
      for (let j = 0; j < GAME_BOARD_SIZE; j++) {
        // Calculate cell index
        const cellIndex = i * GAME_BOARD_SIZE + j;
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

function renderBoardsBanner(firstPlayerName, secondPlayerName) {
  const firstText = firstPlayerName + "'s board";
  firstBoardBanner.textContent = firstText.toUpperCase();
  const secondText = secondPlayerName + "'s board";
  secondBoardBanner.textContent = secondText.toUpperCase();
}

// ## Ship placement buttons functions
function hideShipPlacementBtns() {
  shipPlacementBtns.forEach(hideElem);
}

// # Board cell functions
function getCellFromCoordsFirstBoard(x, y) {
  const GAME_BOARD_SIZE = 10;
  // Calculate index from coords
  const cellIndex = x * GAME_BOARD_SIZE + y;
  // Get cell from board.children
  const cell = firstBoardElem.children[cellIndex];
  return cell;
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
  renderBoardsBanner,
  hideShipPlacementBtns,
  getCellFromCoordsFirstBoard,
};