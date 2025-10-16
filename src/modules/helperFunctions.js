// # Helper functions
// ## General functions
function removeChildren(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}
function hideElem(elem) {
  elem.classList.add('hidden-elem');
}
function showElem(elem) {
  elem.classList.remove('hidden-elem');
}
function changeFlexDirection(elem) {
  console.log(elem.classList)
  console.log("flex direction: ", elem.style.flexDirection)
  if (elem.style.flexDirection === 'column') {
    elem.style.flexDirection = 'row';
  }
  else {
    elem.style.flexDirection = 'column';
  }
}
// ## Board functions
// ## Game board functions
function renderEmptyBoard(boardElem) {
  const cellsCount = 100;
  for (let i = 0; i < cellsCount; i++) {
    const newCellElement = document.createElement('div');
    newCellElement.setAttribute('index', i);
    newCellElement.classList.add('cell');
    boardElem.appendChild(newCellElement);
  }
}
// ## Side Ships functions
function addSideShipsToDOM(shipsContainerElem) {
  shipsContainerElem.style.flexDirection = 'column';
  const shipsSizes = [5, 4, 3, 3, 2];
  for (const size of shipsSizes) {
    const newShipElem = document.createElement('div');
    newShipElem.classList.add('ship-elem');
    newShipElem.style.flexDirection = 'row';
    // Ship Cells
    for (let i = 0; i < size; i++) {
      const newCellElement = document.createElement('div');
      newCellElement.classList.add(...['cell', 'ship']);
      newShipElem.appendChild(newCellElement);
    }
    shipsContainerElem.appendChild(newShipElem);
  }
}
function showSideShips(shipsContainerElem) {
  for (const shipElem of shipsContainerElem.children) {
    showElem(shipElem);
  }
}

export {
  removeChildren,
  hideElem,
  showElem,
  changeFlexDirection,
  renderEmptyBoard,
  addSideShipsToDOM,
  showSideShips,
};