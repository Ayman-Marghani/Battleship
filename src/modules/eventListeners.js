// First board 
const firstBoardElem = document.querySelector(".first-board");
const changeAxisButtonFirst = document.querySelector(".change-axis-first-button");
const randomizeButtonFirst = document.querySelector(".randomize-first-button");
// Second board 
const secondBoardElem = document.querySelector(".second-board");
const changeAxisButtonSecond = document.querySelector(".change-axis-second-button");
const randomizeButtonSecond = document.querySelector(".randomize-second-button");

// First Board Event Listeners
function addEventListenersFirstBoard(handleBoardClickFunc, handleChangeAxisFunc, handleRandomizeFunc) {
  firstBoardElem.addEventListener('click', handleBoardClickFunc);
  changeAxisButtonFirst.addEventListener('click', handleChangeAxisFunc);
  randomizeButtonFirst.addEventListener('click', handleRandomizeFunc);
}

function removeEventListenersFirstBoard(handleBoardClickFunc, handleChangeAxisFunc, handleRandomizeFunc) {
  firstBoardElem.removeEventListener('click', handleBoardClickFunc);
  changeAxisButtonFirst.removeEventListener('click', handleChangeAxisFunc);
  randomizeButtonFirst.removeEventListener('click', handleRandomizeFunc);
}

// Second Board Event Listeners
function addEventListenersSecondBoard(handleBoardClickFunc, handleChangeAxisFunc, handleRandomizeFunc) {
  secondBoardElem.addEventListener('click', handleBoardClickFunc);
  changeAxisButtonSecond.addEventListener('click', handleChangeAxisFunc);
  randomizeButtonSecond.addEventListener('click', handleRandomizeFunc);
}

function removeEventListenersSecondBoard(handleBoardClickFunc, handleChangeAxisFunc, handleRandomizeFunc) {
  secondBoardElem.removeEventListener('click', handleBoardClickFunc);
  changeAxisButtonSecond.removeEventListener('click', handleChangeAxisFunc);
  randomizeButtonSecond.removeEventListener('click', handleRandomizeFunc);
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