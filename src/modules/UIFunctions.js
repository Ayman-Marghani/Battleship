import { BOARD_SIZE } from '../constants';
// Import Helper functions
import {
  removeChildren,
  hideElem,
  showElem,
  renderEmptyBoard,
  addSideShipsToDOM,
  showSideShips,
  editCellType,
} from './helperFunctions';

// DOM elements 
const bannerElem = document.querySelector(".banner");
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
const firstShipPlacementBtns = document.querySelectorAll(".first-ship-placement-btns button");     
// Second board 
const shipsContainerSecond = document.querySelector(".second-side-ships");
const secondBoardElem = document.querySelector(".second-board");
const secondBoardBanner = document.querySelector(".second-board-title");
const secondShipPlacementBtns  = document.querySelectorAll(".second-ship-placement-btns button");
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
  // Render boards
  renderEmptyBoard(firstBoardElem);
  renderEmptyBoard(secondBoardElem);
  // Render ships on the side of boards
  showSideShips(shipsContainerFirst);
  showSideShips(shipsContainerSecond);
  // Reset ships direction to vertical
  shipsContainerFirst.nextElementSibling.textContent = '→';
  shipsContainerSecond.nextElementSibling.textContent = '→';
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
  // Show first player ship placement buttons and hide second player buttons
  showFirstShipPlacementBtns();
  hideSecondShipPlacementBtns();
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
      if (shipElem) {
        // If ship is placed on board hide it from the side
        if (shipsPlacedArr[i]) {
          shipElem.classList.add('placed');
        }
        else {
          shipElem.classList.remove('placed');
        }
      }
    }
  };
}
const renderSideShipsFirst = renderSideShips(shipsContainerFirst);
const renderSideShipsSecond = renderSideShips(shipsContainerSecond);

function changeSideShipsAxisFirst() {
  // Get next elem to shipsContainerFirst
  const directionElem = shipsContainerFirst.nextElementSibling;
  // Change text content of ship-direction
  const curDirection = directionElem.textContent;
  directionElem.textContent = curDirection === '→' ? '↓' : '→'; 
}
function changeSideShipsAxisSecond() {
  // Get next elem to shipsContainerFirst
  const directionElem = shipsContainerSecond.nextElementSibling;
  // Change text content of ship-direction
  const curDirection = directionElem.textContent;
  directionElem.textContent = curDirection === '→' ? '↓' : '→'; 
}

// ## Game board functions
function renderBoard(boardElem) {
  return (playerObj) => {
    const gamebaord = playerObj.getBoard();
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        // Calculate cell index
        const cellIndex = i * BOARD_SIZE + j;
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
      cell.classList.add('hidden-cell');
    }
  };
}
const hideFirstBoard = hideBoard(firstBoardElem);
const hideSecondBoard = hideBoard(secondBoardElem);

function showBoard(boardElem) {
  return () => {
    for (const cell of boardElem.children) {
      cell.classList.remove('hidden-cell');
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
function showFirstShipPlacementBtns() {
  firstShipPlacementBtns.forEach(showElem);
}
function showSecondShipPlacementBtns() {
  secondShipPlacementBtns.forEach(showElem);
}
function hideFirstShipPlacementBtns() {
  firstShipPlacementBtns.forEach(hideElem);
}
function hideSecondShipPlacementBtns() {
  secondShipPlacementBtns.forEach(hideElem);
}

// # Board cell functions
function getCellFromCoordsFirstBoard(x, y) {
  const BOARD_SIZE = 10;
  // Calculate index from coords
  const cellIndex = x * BOARD_SIZE + y;
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
  showFirstShipPlacementBtns,
  showSecondShipPlacementBtns,
  hideFirstShipPlacementBtns,
  hideSecondShipPlacementBtns,
  getCellFromCoordsFirstBoard,
};