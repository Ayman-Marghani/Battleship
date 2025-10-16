// First board 
const firstBoardElem = document.querySelector(".first-board");
const changeAxisBtnFirst = document.querySelector(".change-axis-first-btn");
const randomizeBtnFirst = document.querySelector(".randomize-first-btn");
// Second board 
const secondBoardElem = document.querySelector(".second-board");
const changeAxisBtnSecond = document.querySelector(".change-axis-second-btn");
const randomizeBtnSecond = document.querySelector(".randomize-second-btn");

// TODO: game mode buttons

// TODO: player names form 

// TODO: play again button

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
  firstBoardElem.addEventListener('click', handleSecondPlayerAttack);
  secondBoardElem.addEventListener('click', handleFirstPlayerAttack);
}

function removeEventListenersForAttack(handleFirstPlayerAttack, handleSecondPlayerAttack) {
  firstBoardElem.removeEventListener('click', handleSecondPlayerAttack);
  secondBoardElem.removeEventListener('click', handleFirstPlayerAttack);
}

export {
  addEventListenersFirstBoard,
  removeEventListenersFirstBoard,
  addEventListenersSecondBoard,
  removeEventListenersSecondBoard,
  addEventListenersForAttack,
  removeEventListenersForAttack,
};