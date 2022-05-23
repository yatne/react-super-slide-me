import {Level} from "../SuperSlideMe";
import {ElementType, Element} from "../components/StyledElements";

type ReadableLevel = string;

const readableLevels: ReadableLevel[] = [
  '..x...' +
  '..g...' +
  '..ge..' +
  'x.s...' +
  '.....x' +
  '..x...',

  '...x..' +
  'x....e' +
  '....xx' +
  '.x..sx' +
  '......' +
  '.x....',

  '..x...' +
  '......' +
  '.xs.x.' +
  '....e.' +
  '....x.' +
  '..x...',

  '......' +
  '.s.bxx' +
  'xx...x' +
  '.....e' +
  '...xx.' +
  '.x.xx.',

  '....xe' +
  '.xb.g.' +
  '..s..x' +
  '...s..' +
  'xg.b..' +
  'e.xbx.',

  'x...x.x.' +
  'e.......' +
  'x.s.....' +
  '....x...' +
  '..x.....' +
  '.x...x.x' +
  '...x....' +
  '.x.....x',


  '.............' +
  '.xxx.x.x.xxx.' +
  '..x..x.x.x...' +
  '..x..xxx.xx..' +
  '..x..x.x.x...' +
  '..x..x.x.xxx.' +
  '......s......' +
  '.xxx.xxx.xx..' +
  '.x...x.x.x.x.' +
  '.xx..x.x.x.x.' +
  '.x...x.x.x.x.' +
  '.xxx.x.x.xx..' +
  '.............'

]

const transformLevels = (rLevels: ReadableLevel[]): Level[] => {
  return rLevels.map(rLevel => transformLevel(rLevel));
}

const transformLevel = (rLevel: ReadableLevel): Level => {
  const boardSize = Math.sqrt(rLevel.length);
  const elements = []
  for (let i = 0; i < rLevel.length; i++) {
    if (rLevel[i] !== '.') {
      elements.push(createElement(rLevel[i], i, boardSize));
    }
  }
  return {
    boardSize,
    elements,
  }
}

const createElement = (elementChar: string, index: number, boardSize: number): Element => {
  let type: ElementType = "Void";
  switch (elementChar) {
    case 'x':
      type = "Wall";
      break;
    case 's':
      type = "Start";
      break;
    case 'e':
      type = "End";
      break;
    case 'b':
      type = "Box";
      break;
    case 'g':
      type = "GreenField";
      break;
  }
  const posX = index % boardSize;
  const posY = Math.floor(index / boardSize);
  return {
    type,
    posX,
    posY,
  }
}

export const levels = transformLevels(readableLevels);

// export const levels: Level[] = [
//   {
//     boardSize: 6,
//     elements: [
//       {type: "Start", posX: 2, posY: 3},
//       {type: "Wall", posX: 2, posY: 0},
//       {type: "Wall", posX: 0, posY: 3},
//       {type: "Wall", posX: 2, posY: 5},
//       {type: "Wall", posX: 5, posY: 4},
//       {type: "End", posX: 3, posY: 2},
//     ]
//   }, {
//     boardSize: 6,
//     elements: [
//       {type: "Start", posX: 4, posY: 3},
//       {type: "Wall", posX: 3, posY: 0},
//       {type: "Wall", posX: 4, posY: 2},
//       {type: "Wall", posX: 5, posY: 2},
//       {type: "Wall", posX: 5, posY: 3},
//       {type: "Wall", posX: 0, posY: 1},
//       {type: "Wall", posX: 1, posY: 3},
//       {type: "Wall", posX: 1, posY: 5},
//       {type: "End", posX: 5, posY: 1},
//     ]
//   }, {
//     boardSize: 7,
//     elements: [
//       {type: "Start", posX: 0, posY: 0},
//       {type: "Wall", posX: 1, posY: 1},
//       {type: "Wall", posX: 2, posY: 1},
//       {type: "Wall", posX: 3, posY: 1},
//       {type: "Wall", posX: 0, posY: 1},
//       {type: "End", posX: 0, posY: 2, state: "Default"},
//       {type: "Box", posX: 0, posY: 4},
//       {type: "Box", posX: 1, posY: 4},
//       {type: "GreenField", posX: 4, posY: 4, state: "Default"},
//     ]
//   }, {
//     boardSize: 5,
//     elements: [
//       {type: "Start", posX: 0, posY: 0},
//       {type: "GreenField", posX: 1, posY: 0, state: "Default"},
//       {type: "GreenField", posX: 2, posY: 0, state: "Default"},
//       {type: "GreenField", posX: 3, posY: 0, state: "Default"},
//       {type: "End", posX: 4, posY: 4, state: "Default"},
//     ]
//   }
// ];
