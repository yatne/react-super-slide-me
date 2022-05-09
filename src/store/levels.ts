import { Element } from "../components/StyledElements";

export const levels = [{
  boardSize: 7,
  number: 0,
  elements: [
    {type: "Start", posX: 0, posY: 0, renderOrder: 0} as Element,
    {type: "Wall", posX: 1, posY: 1, renderOrder: 1} as Element,
    {type: "Wall", posX: 2, posY: 1, renderOrder: 2} as Element,
    {type: "Wall", posX: 3, posY: 1, renderOrder: 3} as Element,
    {type: "Wall", posX: 0, posY: 1, renderOrder: 4} as Element,
    {type: "End", posX: 0, posY: 2, renderOrder: 5, state: "Default"} as Element,
    {type: "Box", posX: 0, posY: 4, renderOrder: 6} as Element,
    {type: "Box", posX: 1, posY: 4, renderOrder: 7} as Element,
    {type: "GreenField", posX: 4, posY: 4, renderOrder: 8, state: "Default"} as Element,
  ]
}, {
  boardSize: 5,
  number: 1,
  elements: [
    {type: "Start", posX: 0, posY: 0, renderOrder: 0} as Element,
    {type: "GreenField", posX: 1, posY: 0, renderOrder: 2, state: "Default"} as Element,
    {type: "GreenField", posX: 2, posY: 0, renderOrder: 3, state: "Default"} as Element,
    {type: "GreenField", posX: 3, posY: 0, renderOrder: 4, state: "Default"} as Element,
    {type: "End", posX: 4, posY: 4, renderOrder: 5, state: "Default"} as Element,
  ]
}]
