import styled from "styled-components";

type ElementProps = Element & { boardSize: number };

export interface Element {
  type: "Start" | "End" | "Wall",
  posX: number;
  posY: number;
  previousPosX?: number;
  previousPosY?: number;
  renderOrder?: number;
}

const calculateDistance = (props: ElementProps) => {
  return Math.max(
    Math.abs(props.posX - getOldPos(props.posX, props.previousPosX)),
    Math.abs(props.posY - getOldPos(props.posY, props.previousPosY))
  );
}

const getOldPos = (pos: number, oldPos: number | undefined) => {
  if (oldPos === undefined) return pos;
  return oldPos;
}

const StyledElement = styled.div<ElementProps>`
  position: absolute;
  top: calc(${props => props.theme.gameBoardMargin} + ${props => props.posY} * ${props => props.theme.width ? props.theme.width : '400xp'} / ${props => props.boardSize});
  left: calc(${props => props.theme.gameBoardMargin} + ${props => props.posX} * ${props => props.theme.width ? props.theme.width : '400xp'} / ${props => props.boardSize});
  width: calc(${props => props.theme.width ? props.theme.width : '400xp'} / ${props => props.boardSize});
  padding-bottom: calc(${props => props.theme.width ? props.theme.width : '400px'} / ${props => props.boardSize});
  height: 0;
  transition: ${props => calculateDistance(props) / (2 * props.boardSize) }s linear;
`

export const StartElement = styled(StyledElement)`
  box-shadow: inset 0 0 5px 1px #001249;
  border-radius: 50%;
  background-color: #2e57dc;
`

export const EndElement = styled(StyledElement)`
  box-shadow: inset 0 0 5px 1px #001249;
  border-radius: 50%;
  background-color: #c61fe1;
`

export const WallElement = styled(StyledElement)`
  box-shadow: inset 0 0 5px 1px #252525;
  border-radius: 5%;
  background-color: #484848;
`

export default StyledElement
