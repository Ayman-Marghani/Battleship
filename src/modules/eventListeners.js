// Game mode buttons
const gameModeBtns = document.querySelectorAll(".game-mode-btn");
// Player Names form
const playerNamesForm = document.querySelector(".player-names-form");
// First board 
const firstBoardElem = document.querySelector(".first-board");
const changeAxisBtnFirst = document.querySelector(".change-axis-first-btn");
const randomizeBtnFirst = document.querySelector(".randomize-first-btn");
// Second board 
const secondBoardElem = document.querySelector(".second-board");
const changeAxisBtnSecond = document.querySelector(".change-axis-second-btn");
const randomizeBtnSecond = document.querySelector(".randomize-second-btn");
// Play again button
const playAgainBtn = document.querySelector(".play-again-btn");

// Game mode buttons
function addEventListenerGameModeBtns(handleGameModeClick) {
  gameModeBtns.forEach((btn) => {
    btn.addEventListener('click', handleGameModeClick);
  });
}
function removeEventListenerGameModeBtns(handleGameModeClick) {
  gameModeBtns.forEach((btn) => {
    btn.removeEventListener('click', handleGameModeClick);
  });
}

// Player names form 
function addEventListenerPlayerNamesForm(handleFormSubmit) {
  playerNamesForm.addEventListener("submit", handleFormSubmit);
}
function removeEventListenerPlayerNamesForm(handleFormSubmit) {
  playerNamesForm.removeEventListener("submit", handleFormSubmit);
}

// First Board Event Listeners
function addEventListenersFirstBoard(handleBoardClickFunc, handleChangeAxisFunc, handleRandomizeFunc) {
  firstBoardElem.addEventListener('click', handleBoardClickFunc);
  changeAxisBtnFirst.addEventListener('click', handleChangeAxisFunc);
  randomizeBtnFirst.addEventListener('click', handleRandomizeFunc);
}
function removeEventListenersFirstBoard(handleBoardClickFunc, handleChangeAxisFunc, handleRandomizeFunc) {
  firstBoardElem.removeEventListener('click', handleBoardClickFunc);
  changeAxisBtnFirst.removeEventListener('click', handleChangeAxisFunc);
  randomizeBtnFirst.removeEventListener('click', handleRandomizeFunc);
}

// Second Board Event Listeners
function addEventListenersSecondBoard(handleBoardClickFunc, handleChangeAxisFunc, handleRandomizeFunc) {
  secondBoardElem.addEventListener('click', handleBoardClickFunc);
  changeAxisBtnSecond.addEventListener('click', handleChangeAxisFunc);
  randomizeBtnSecond.addEventListener('click', handleRandomizeFunc);
}
function removeEventListenersSecondBoard(handleBoardClickFunc, handleChangeAxisFunc, handleRandomizeFunc) {
  secondBoardElem.removeEventListener('click', handleBoardClickFunc);
  changeAxisBtnSecond.removeEventListener('click', handleChangeAxisFunc);
  randomizeBtnSecond.removeEventListener('click', handleRandomizeFunc);
}

// Attack event listeners
function addEventListenersForAttack(handleFirstPlayerAttack, handleSecondPlayerAttack) {
  // Handle second player attack if 2 players mode 
  if (handleSecondPlayerAttack !== null) {
    firstBoardElem.addEventListener('click', handleSecondPlayerAttack);
  }
  secondBoardElem.addEventListener('click', handleFirstPlayerAttack);
}
function removeEventListenersForAttack(handleFirstPlayerAttack, handleSecondPlayerAttack) {
  // Handle second player attack if 2 players mode 
  if (handleSecondPlayerAttack !== null) {
    firstBoardElem.removeEventListener('click', handleSecondPlayerAttack);
  }
  secondBoardElem.removeEventListener('click', handleFirstPlayerAttack);
}

// Play again button event listener
function addEventListenerPlayAgainBtn(handlePlayAgainClick) {
  playAgainBtn.addEventListener('click', handlePlayAgainClick);
} 
function removeEventListenerPlayAgainBtn(handlePlayAgainClick) {
  playAgainBtn.removeEventListener('click', handlePlayAgainClick);
} 

export {
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
};