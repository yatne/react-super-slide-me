import styled from "styled-components";
import {moveToMilliseconds} from "../store/timeLogic";

type ElementProps = CurrentElement & { boardSize: number };

export type ElementType =  "Start" | "End" | "Wall" | "Box" | "Void" | "GreenField";
type ElementState = "Triggered" | "Default";

export interface Element {
  type: ElementType,
  posX: number;
  posY: number;
  state?: ElementState;
}

export interface CurrentElement extends Element {
  previousPosX: number;
  previousPosY: number;
  renderOrder: number;
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
  z-index: 300;
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

export const EndElement = styled(StyledElement)`
  box-shadow: inset 0 0 5px ${props => props.state === "Triggered" ? '1px #001249' : '8px #2e57dc'}; 
  border-radius: 5%;
  background-color: ${props => props.state === "Triggered" ? '#2e57dc' : '#f6f6f6'};
  transition-delay: ${props => moveToMilliseconds(props, props.boardSize)}ms;
  z-index: 500;
`

export const GreenFieldElement = styled(StyledElement)<ElementProps>`
  box-shadow: inset 0 0 5px 1px ${props => props.state === "Triggered" ? '#252525' : '#2e7200'};
  background-color: ${props => props.state === "Triggered" ? '#2e7200' : '#ccffc5'};
  border-radius: ${props => props.state === "Triggered" ? '5%' : '0'};
  transition-delay: ${props => moveToMilliseconds(props, props.boardSize)}ms;
`

export const VoidElement = styled(StyledElement)`
  display: none;
`

export default StyledElement
