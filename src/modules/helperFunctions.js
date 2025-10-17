// # Helper functions
// ## General functions
function removeChildren(elem) {
  while (elem && elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}
function hideElem(elem) {
  if (elem) {
    if (elem.classList.contains('ship-elem')) {
      elem.classList.add('hidden-ship');
    }
    else {
      elem.classList.add('hidden-elem');
    }
  }
}
function showElem(elem) {
  if (elem) {
    if (elem.classList.contains('ship-elem')) {
      elem.classList.remove('hidden-ship');
    }
    else {
      elem.classList.remove('hidden-elem');
    }
  }
}
function changeFlexDirection(elem) {
  if (elem) {
    if (elem.style.flexDirection === 'column') {
      elem.style.flexDirection = 'row';
    }
    else {
      elem.style.flexDirection = 'column';
    }
  }
}
// ## Board functions
// ## Game board functions
function renderEmptyBoard(boardElem) {
  if (boardElem) {
    const cellsCount = 100;
    for (let i = 0; i < cellsCount; i++) {
      const newCellElement = document.createElement('div');
      newCellElement.setAttribute('index', i);
      newCellElement.classList.add('cell');
      boardElem.appendChild(newCellElement);
    }
  }
}
// ## Side Ships functions
function addSideShipsToDOM(shipsContainerElem) {
  if (shipsContainerElem) {
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
}
function showSideShips(shipsContainerElem) {
  if (shipsContainerElem) {
    for (const shipElem of shipsContainerElem.children) {
      showElem(shipElem);
    }
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