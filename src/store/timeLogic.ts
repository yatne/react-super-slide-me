import {Element} from "../components/StyledElement";

export const calculateDistance = (props: Element) => {
  return Math.max(
    Math.abs(props.posX - getOldPos(props.posX, props.previousPosX)),
    Math.abs(props.posY - getOldPos(props.posY, props.previousPosY))
  );
}

export const moveToMilliseconds = (element: Element, boardSize: number) => {
  return 1000 * calculateDistance(element) / (2 * boardSize);
}

export const longestMove = (elements: Element[], boardSize: number) => {
  let millis = 0;
  elements.forEach((element) => {
    if (moveToMilliseconds(element, boardSize) > millis) {
      millis = moveToMilliseconds(element, boardSize);
    }
  })
  return millis;
}

const getOldPos = (pos: number, oldPos: number | undefined) => {
  if (oldPos === undefined) return pos;
  return oldPos;
}
