import {Element} from "../components/StyledElement";

export type Direction = "Up" | "Down" | "Left" | "Right"

const elementMovable = (element: Element): boolean => {
  return (["Start", "Box"].includes(element.type));
};

const elementsCanInteract = (ele1: Element, ele2: Element) => {
  if ([ele1, ele2].find(ele => ele.type === "Start") && [ele1, ele2].find(ele => ele.type === "End")) {
    return true;
  }
  if ([ele1, ele2].find(ele => ele.type === "GreenField" && ele.state !== "Active")) {
    return true
  }
  return false;
}

const interact = (ele1: Element, ele2: Element | undefined) => {
  if (ele2 === undefined) return;
  if (ele1.type === "Start" && ele2.type === "End") {
    ele1.type = "Void";
    ele2.type = "EndDone";
  }
  if (ele2.type === "GreenField" && ele2.state !== "Active") {
    ele2.state = "Active";
    ele2.previousPosX = ele1.previousPosX;
    ele2.previousPosY = ele1.previousPosY;
  }
}

const sortByDirection = (elements: Element[], direction: Direction) => {
  switch (direction) {
    case "Up":
      elements.sort((ele1: Element, ele2: Element) => ele1.posY < ele2.posY ? 1 : ele1.posY === ele2.posY ? 0 : -1)
      break;
    case "Down":
      elements.sort((ele1: Element, ele2: Element) => ele1.posY > ele2.posY ? 1 : ele1.posY === ele2.posY ? 0 : -1)
      break;
    case "Right":
      elements.sort((ele1: Element, ele2: Element) => ele1.posX > ele2.posX ? 1 : ele1.posX === ele2.posX ? 0 : -1)
      break;
    case "Left":
      elements.sort((ele1: Element, ele2: Element) => ele1.posX < ele2.posX ? 1 : ele1.posX === ele2.posX ? 0 : -1)
      break;
  }
}

export const sortByRenderOrder = (elements: Element[]) => {
  elements.sort((e1: Element, e2: Element) => {
    if (!e1.renderOrder || !e2.renderOrder) return 0;
    return e1.renderOrder > e2.renderOrder ? 1 : e1.renderOrder === e2.renderOrder ? 0 : -1;
  });
}

const findElementOnAttPos = (posX: number, posY:number, elements: Element[]): Element | undefined => {
  return elements.find(ele => ele.posX === posX && ele.posY === posY)
}

const getAttemptedPos = (element: Element, direction: Direction): {attX: number, attY: number} => {
  switch (direction) {
    case "Up":
      return {attX: element.posX, attY: element.posY - 1}
    case "Down":
      return {attX: element.posX, attY: element.posY + 1}
    case "Left":
      return {attX: element.posX - 1, attY: element.posY}
    case "Right":
      return {attX: element.posX + 1, attY: element.posY}
  }
}

const outOfBounds = (posX: number, posY:number, boardSize: number) => {
  return (posX >= boardSize || posY >= boardSize || posX < 0 || posY < 0)

}

export const move = (elements: Element[], direction: Direction, boardSize: number) => {
  let newElements = [...elements]
  newElements.map(element => {
    element.previousPosX = element.posX;
    element.previousPosY = element.posY;
  })
  sortByDirection(elements, direction);
  let tryToMove = true;
  while (tryToMove) {
    tryToMove = false;
    newElements.map(element => {
      if (elementMovable(element)) {
        const {attX, attY} = getAttemptedPos(element, direction)
        if (!outOfBounds(attX, attY, boardSize)) {
          const elementOnAttPos = findElementOnAttPos(attX, attY, elements);
          if (!elementOnAttPos || elementsCanInteract(element, elementOnAttPos)) {
            tryToMove = true;
            interact(element, elementOnAttPos);
            element.posX = attX;
            element.posY = attY;
          }
        }
      }
    })
  }
  sortByRenderOrder(newElements)
  return newElements;
}
