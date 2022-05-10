import {Level} from "../SuperSlideMe";

export const levels: Level[] = [
  {
    boardSize: 6,
    elements: [
      {type: "Start", posX: 2, posY: 3},
      {type: "Wall", posX: 2, posY: 0},
      {type: "Wall", posX: 0, posY: 3},
      {type: "Wall", posX: 2, posY: 5},
      {type: "Wall", posX: 5, posY: 4},
      {type: "End", posX: 3, posY: 2},
    ]
  }, {
    boardSize: 6,
    elements: [
      {type: "Start", posX: 4, posY: 3},
      {type: "Wall", posX: 3, posY: 0},
      {type: "Wall", posX: 4, posY: 2},
      {type: "Wall", posX: 5, posY: 2},
      {type: "Wall", posX: 5, posY: 3},
      {type: "Wall", posX: 0, posY: 1},
      {type: "Wall", posX: 1, posY: 3},
      {type: "Wall", posX: 1, posY: 5},
      {type: "End", posX: 5, posY: 1},
    ]
  }, {
    boardSize: 7,
    elements: [
      {type: "Start", posX: 0, posY: 0},
      {type: "Wall", posX: 1, posY: 1},
      {type: "Wall", posX: 2, posY: 1},
      {type: "Wall", posX: 3, posY: 1},
      {type: "Wall", posX: 0, posY: 1},
      {type: "End", posX: 0, posY: 2, state: "Default"},
      {type: "Box", posX: 0, posY: 4},
      {type: "Box", posX: 1, posY: 4},
      {type: "GreenField", posX: 4, posY: 4, state: "Default"},
    ]
  }, {
    boardSize: 5,
    elements: [
      {type: "Start", posX: 0, posY: 0},
      {type: "GreenField", posX: 1, posY: 0, state: "Default"},
      {type: "GreenField", posX: 2, posY: 0, state: "Default"},
      {type: "GreenField", posX: 3, posY: 0, state: "Default"},
      {type: "End", posX: 4, posY: 4, state: "Default"},
    ]
  }
];
