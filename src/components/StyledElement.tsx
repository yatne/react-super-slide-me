import styled from "styled-components";
import {calculateDistance, moveToMilliseconds} from "../store/timeLogic";

type ElementProps = Element & { boardSize: number };

export interface Element {
  type: "Start" | "End" | "Wall" | "Box" | "EndDone" | "Void",
  posX: number;
  posY: number;
  previousPosX?: number;
  previousPosY?: number;
  renderOrder?: number;
}


const StyledElement = styled.div<ElementProps>`
  position: absolute;
  height: 0;
  top: calc(${props => props.theme.gameBoardMargin} + ${props => props.posY} * ${props => props.theme.width ? props.theme.width : '400xp'} / ${props => props.boardSize});
  left: calc(${props => props.theme.gameBoardMargin} + ${props => props.posX} * ${props => props.theme.width ? props.theme.width : '400xp'} / ${props => props.boardSize});
  width: calc(${props => props.theme.width ? props.theme.width : '400xp'} / ${props => props.boardSize});
  padding-bottom: calc(${props => props.theme.width ? props.theme.width : '400px'} / ${props => props.boardSize});
  transition: ${props => moveToMilliseconds(props, props.boardSize)}ms linear;
`

export const StartElement = styled(StyledElement)`
  box-shadow: inset 0 0 5px 1px #001249;
  border-radius: 50%;
  background-color: #2e57dc;
`

export const EndElement = styled(StyledElement)`
  box-shadow: inset 0 0 5px 8px #2e57dc;
  border-radius: 5%;
  background-color: #f6f6f6;
`

export const WallElement = styled(StyledElement)`
  box-shadow: inset 0 0 5px 1px #252525;
  border-radius: 5%;
  background-color: #484848;
`

export const BoxElement = styled(StyledElement)`
  box-shadow: inset 0 0 5px 1px #252525;
  border-radius: 22%;
  background-color: #7a4600;
`

export const EndDoneElement = styled(StyledElement)`
  box-shadow: inset 0 0 5px 1px #001249;
  border-radius: 5%;
  background-color: #2e57dc;
`

export const VoidElement = styled(StyledElement)`
  display: none;
`

export default StyledElement
