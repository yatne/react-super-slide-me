import {CurrentElement, Element} from "../components/StyledElements";

export type Direction = "Up" | "Down" | "Left" | "Right"

const elementMovable = (element: Element): boolean => {
  return (["Start", "Box", "AltStart", "BlueBox", "Crusher"].includes(element.type)) && element.state !== "Triggered" && element.state !== "Void";
};

const elementsCanInteract = (ele1: Element, ele2: Element) => {
  if (["Start", "AltStart", "Box"].includes(ele1.type) && [ele1, ele2].find(ele => ele.type === "Start") && [ele1, ele2].find(ele => ele.type === "End" && ele.state !== "Triggered")) {
    return true;
  }
  if (["Start", "AltStart", "Box"].includes(ele1.type) && [ele1, ele2].find(ele => ele.type === "AltStart") && [ele1, ele2].find(ele => ele.type === "AltEnd" && ele.state !== "Triggered")) {
    return true;
  }
  if (["Start", "AltStart", "Box"].includes(ele1.type) && [ele1, ele2].find(ele => ele.type === "GreenField" && ele.state !== "Triggered")) {
    return true;
  }
  if ((ele1.type === "Crusher" && ele2.type === "OrangeWall") || (ele2.type === "OrangeWall" && ele2.state === "Void")) {
    return true;
  }
  if (ele2.type === "BluePath") {
    return true;
  }
  if (["Start", "AltStart", "Box", "Crusher"].includes(ele1.type) && ele2.type === "RedField"){
    return true;
  }
  if (["Start", "AltStart", "Box", "Crusher"].includes(ele1.type) && ele2.state === "Void") {
    return true;
  }
  return false;
}

const interact = (ele1: CurrentElement, ele2: CurrentElement | undefined) => {
  if (ele2 === undefined) return;
  if (ele1.type === "Start" && ele2.type === "End") {
    ele1.state = "Triggered";
    ele2.state = "Triggered";
    ele2.previousPosX = ele1.previousPosX;
    ele2.previousPosY = ele1.previousPosY;
  }
  if (ele1.type === "AltStart" && ele2.type === "AltEnd") {
    ele1.state = "Triggered";
    ele2.state = "Triggered";
    ele2.previousPosX = ele1.previousPosX;
    ele2.previousPosY = ele1.previousPosY;
  }
  if (ele2.type === "GreenField" && ele2.state !== "Triggered") {
    ele2.state = "Triggered";
    ele2.previousPosX = ele1.previousPosX;
    ele2.previousPosY = ele1.previousPosY;
  }
  if (ele2.type === "RedField" && ele2.state !== "Triggered") {
    ele1.state = "Void";
    ele2.state = "Triggered";
    ele2.previousPosX = ele1.previousPosX;
    ele2.previousPosY = ele1.previousPosY;
  }
  if (ele1.type === "Crusher" && ele2.type === "OrangeWall") {
    ele2.state = "Void";
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

export const sortByRenderOrder = (elements: CurrentElement[]) => {
  elements.sort((e1, e2) => {
    if (!e1.renderOrder || !e2.renderOrder) return 0;
    return e1.renderOrder > e2.renderOrder ? 1 : e1.renderOrder === e2.renderOrder ? 0 : -1;
  });
}

const findElementOnAttPos = (posX: number, posY:number, elements: CurrentElement[]): CurrentElement | undefined => {
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

export const move = (elements: CurrentElement[], direction: Direction, boardSize: number) => {
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
          if ((!elementOnAttPos && element.type !== "BlueBox") || (elementOnAttPos && elementsCanInteract(element, elementOnAttPos))) {
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
