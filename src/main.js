// JS modules
import Player from './modules/player';
import {
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
  replaceCellClass,
} from './modules/UIFunctions';
import {
  addEventListenerGameModeBtns,
  removeEventListenerGameModeBtns,
  addEventListenerPlayerNamesForm,
  removeEventListenerPlayerNamesForm,
  addEventListenersFirstBoard,
  removeEventListenersFirstBoard,
  addEventListenersSecondBoard,
  removeEventListenersSecondBoard,
  addEventListenersForAttack,
  removeEventListenersForAttack,
  addEventListenerPlayAgainBtn,
  removeEventListenerPlayAgainBtn,
} from './modules/eventListeners';
// CSS styles file
import './styles.css';

// Global variables
const GAME_BOARD_SIZE = 10;
let isComputerMode = null;
let curPlayer = null;
let firstPlayer = null;
let secondPlayer = null;
let finishedPlacingShips = false;
// Player functions
let handlePlaceShipFirstPlayer = null;
let handlePlaceShipSecondPlayer = null;
let handleFirstPlayerAttack = null;
let handleSecondPlayerAttack = null;
let handleChangeAxisFirstBoard = null;
let handleChangeAxisSecondBoard = null;
let handleRandomizeFirstBoard = null;
let handleRandomizeSecondBoard = null;

// Helper functions
// Returns the x and y coordinates of a cell based on its index.
function getCellCoordinates(cell) {
  // Get index of cell
  const index = Number(cell.getAttribute('index'));
  // Calc x and y coordinates
  const x = Math.floor(index / GAME_BOARD_SIZE);
  const y = index % GAME_BOARD_SIZE;
  return [x, y];
}
function getRandomCoord() {
  const x = Math.floor(Math.random() * GAME_BOARD_SIZE);
  const y = Math.floor(Math.random() * GAME_BOARD_SIZE);
  return [x, y];
}

// # Main functions
// ## Game flow functions
function startNewGame() {
  // Reset global variables
  isComputerMode = null;
  curPlayer = null;
  firstPlayer = null;
  secondPlayer = null;
  finishedPlacingShips = false;
  // Reset player functions
  handlePlaceShipFirstPlayer = null;
  handlePlaceShipSecondPlayer = null;
  handleFirstPlayerAttack = null;
  handleSecondPlayerAttack = null;
  handleChangeAxisFirstBoard = null;
  handleChangeAxisSecondBoard = null;
  handleRandomizeFirstBoard = null;
  handleRandomizeSecondBoard = null;
  // Reset screen and render Game Mode screen
  resetDOM();
  renderGameModeScreen();
  addEventListenerGameModeBtns(handleGameModeClick);
}
function initGameScreen() {
  // Remove player names form event listener
  removeEventListenerPlayerNamesForm(handlePlayerNamesFormSubmit);
  // Define all player functions here
  // First Player
  handlePlaceShipFirstPlayer = handlePlaceShip(firstPlayer);
  handleFirstPlayerAttack = handlePlayerAttack(firstPlayer, secondPlayer);
  handleChangeAxisFirstBoard = handleChangeAxis(firstPlayer);
  handleRandomizeFirstBoard = handleRandomize(firstPlayer);
  // Define second player functions only if game mode is 2 players
  if (!isComputerMode) {
    // Second player
    handlePlaceShipSecondPlayer = handlePlaceShip(secondPlayer);
    handleSecondPlayerAttack = handlePlayerAttack(secondPlayer, firstPlayer);
    handleChangeAxisSecondBoard = handleChangeAxis(secondPlayer);
    handleRandomizeSecondBoard = handleRandomize(secondPlayer);
  }
  // Render game Screen
  renderGameScreen(isComputerMode);
  // Render boards banner
  renderBoardsBanner(firstPlayer.name, secondPlayer.name);
  // First player place ships
  placeFirstPlayerShips();
}
function continueGameAfterShipsPlacement() {
  // If 2 players mode remove second board event Listeners
  if (!isComputerMode) {
    removeEventListenersSecondBoard(handlePlaceShipSecondPlayer, handleChangeAxisSecondBoard, handleRandomizeSecondBoard);
  }
  // Remove ship placement buttons
  hideShipPlacementBtns();

  finishedPlacingShips = true;
  // Hide second board if computer mode
  if (isComputerMode) {
    hideSecondBoard();
  }
  // Render Second board 
  renderSecondBoard(secondPlayer);
  // Hide second board and show first board
  setTimeout(() => {
    hideSecondBoard();
    showFirstBoard();
    // Display current player turn
    renderBanner(`${curPlayer}'s turn`);
    // Add Attack event listeners for each board
    addEventListenersForAttack(handleFirstPlayerAttack, handleSecondPlayerAttack);
  }, 1000);
}
function switchPlayerTurn(nextPlayerName) {
  // change curPlayer global variable
  curPlayer = nextPlayerName;
  // render player turn banner
  renderBanner(`${curPlayer}'s turn`);
  if (curPlayer === firstPlayer.name) { // First player case
    // show first player board
    showFirstBoard(); 
    // hide second player board
    hideSecondBoard();
  }
  else { // Second player case
    if (isComputerMode) { // Computer mode
      setTimeout(() => {
        // Make computer attack first player
        computerAttack();
      }, 1000);
    }
    else { // 2 players mode
      // Show second player board 
      showSecondBoard();
      // Hide first player board
      hideFirstBoard();
    }
  }
}
function endGame(winningPlayerName) {
  console.log("End game function called");
  renderBanner(`${winningPlayerName} Won!`);
  // Show play again button
  showPlayAgainBtn();
  // Add event listener for play again button
  addEventListenerPlayAgainBtn(handlePlayAgainClick);
  // Remove attack event listener for all boards
  removeEventListenersForAttack(handleFirstPlayerAttack, handleSecondPlayerAttack);
}
function moveToPlayerNamesFormScreen(isComputerMode) {
  removeEventListenerGameModeBtns(handleGameModeClick);
  renderPlayerNamesFormScreen(isComputerMode);
  addEventListenerPlayerNamesForm(handlePlayerNamesFormSubmit);
}

// ## Game mode screen functions
function handleGameModeClick(event) {
  isComputerMode = event.target.classList.contains('computer-mode-btn');
  moveToPlayerNamesFormScreen(isComputerMode);
}
function handlePlayerNamesFormSubmit(event) { 
  event.preventDefault();
  // Init firstPlayer
  firstPlayer = new Player(false, getFirstPlayerName());
  if (isComputerMode) {
    // Init second player (computer)
    secondPlayer = new Player(true);
  }
  else {
    // Init second player
    secondPlayer = new Player(false, getSecondPlayerName());
  }
  curPlayer = firstPlayer.name;
  initGameScreen();
}

// ## Player attack function
function handlePlayerAttack(attacker, attackedPlayer) {
  return (event) => {
    console.log("handle attack triggered")
    // Make sure it's current player turn
    if (curPlayer !== attacker.name) {
      return;
    }
    const curCell = event.target;
    // make sure it's an empty or ship cell
    const isEmptyOrShip = curCell.classList.contains('empty') || curCell.classList.contains('ship');
    if (isEmptyOrShip) {      
      // Get x and y coordinates
      const [x, y] = getCellCoordinates(curCell);
      // Attack second board
      const isHit = attackedPlayer.receiveAttack(x, y);
      if (isHit) { // Hit case
        // replace ship class with hit class
        replaceCellClass(curCell, 'ship', 'hit');
        if (attackedPlayer === firstPlayer) {
          renderFirstBoard(firstPlayer);
        }
        else {
          renderSecondBoard(secondPlayer);
        }
      }
      else { // Miss case
        // Replace empty class with miss class
        replaceCellClass(curCell, 'empty', 'miss');
        // Switch to next player
        switchPlayerTurn(attackedPlayer.name);
      }
      console.log("inside attack handler before game end check: ", attacker, attackedPlayer)
      // check if game ended
      if (attackedPlayer.isLoser()) {
        // call End game function 
        endGame(attacker.name);
      }
    }
  };
}

// ## Ships placement functions
function placeFirstPlayerShips() {
  // First player turn to place Ships
  renderBanner(`${firstPlayer.name}'s turn to place ships`);
  // Event listener for first board
  addEventListenersFirstBoard(handlePlaceShipFirstPlayer, handleChangeAxisFirstBoard, handleRandomizeFirstBoard);
}
function placeSecondPlayerShips() {
  // Remove first board event Listeners
  removeEventListenersFirstBoard(handlePlaceShipFirstPlayer, handleChangeAxisFirstBoard, handleRandomizeFirstBoard);
  // Render First board
  renderFirstBoard(firstPlayer);
  // Hide first board from the second player
  setTimeout( () => {
    // Second player turn to place Ships
    renderBanner(`${secondPlayer.name}'s turn to place ships`);
    if (isComputerMode) { // Computer mode
      placeComputerShips();
    }
    else { // 2 players mode
      // Hide first board
      hideFirstBoard();
      // Event listener for second board
      addEventListenersSecondBoard(handlePlaceShipSecondPlayer, handleChangeAxisSecondBoard, handleRandomizeSecondBoard);
    }
  }, 1000);
}
function handlePlaceShip(playerObj) {
  return (event) => {
    console.log("handle place ships triggered", playerObj)
    // If all ships are already placed return
    if (finishedPlacingShips) {
      return;
    }
    console.log("handle place ships triggered passed if condition")
    // Get the clicked cell and get its coordinates
    const curCell = event.target;
    const [x, y] = getCellCoordinates(curCell);
    // Place the ship in the clicked cell
    const isShipPlaced = playerObj.placeShip(x, y) 
    if (isShipPlaced) {
      renderBanner(`${curPlayer}'s turn to place ships`);
      // Render current player board and rerender ships on the side
      if (playerObj === firstPlayer) {
        renderFirstBoard(firstPlayer);
        renderSideShipsFirst(firstPlayer.getIsShipPlacedArr());
      }
      else {
        renderSecondBoard(secondPlayer);
        renderSideShipsSecond(secondPlayer.getIsShipPlacedArr());
      }
    }
    else {
      // Display ship placement error 
      renderBanner("Invalid Placement! Try Again");
    }
    // If all ships are placed start the game
    if (playerObj.isAllShipsPlaced()) {
      if (playerObj === firstPlayer) {
        placeSecondPlayerShips();
      }
      else {
        continueGameAfterShipsPlacement();
      } 
    }
  };
}

// ## Handle change axis and randomize buttons functions
function handleChangeAxis(playerObj) {
  return () => {
    playerObj.changeShipAxis();
    if (playerObj === firstPlayer) {
      changeSideShipsAxisFirst();
    }
    else {
      changeSideShipsAxisSecond();
    }
  }
}
function handleRandomize(playerObj) {
  return () => {
    playerObj.randomizeShips();
    if (playerObj === firstPlayer) {
      renderSideShipsFirst(firstPlayer.getIsShipPlacedArr());
      placeSecondPlayerShips();
    }
    else {
      renderSideShipsSecond(secondPlayer.getIsShipPlacedArr());
      continueGameAfterShipsPlacement();
    } 
  };
}
// # Computer functions
function placeComputerShips() {
  // Place ships randomly and render side ships
  secondPlayer.randomizeShips();
  renderSideShipsSecond(secondPlayer.getIsShipPlacedArr());
  // Move to next step
  continueGameAfterShipsPlacement();
}
function computerAttack() {
  // Get random coordinates
  const x = Math.floor(Math.random() * GAME_BOARD_SIZE);
  const y = Math.floor(Math.random() * GAME_BOARD_SIZE);
  // Attack first player
  const isHit = firstPlayer.receiveAttack(x, y);
  console.log("Computer is attacking at: ", x, y, " | isHit: ", isHit);
  // Render first player board after being attacked
  renderFirstBoard(firstPlayer);
  if (isHit) { // Hit case
    // Check if game ended
    if (firstPlayer.isLoser()) {
      // Call End game function 
      endGame(secondPlayer.name);
    }
    // Make computer attack again
    switchPlayerTurn(secondPlayer.name);
  }
  else { // miss case
    // Switch to first player
    switchPlayerTurn(firstPlayer.name);
  }
}

// # Handle play again button function
function handlePlayAgainClick(event) {
  // remove event listener for play again button
  removeEventListenerPlayAgainBtn(handlePlayAgainClick);
  // start the game again
  startNewGame();
}

// Initial render for creating board cells and ships on the side
initialRender();
// Start the game
startNewGame();