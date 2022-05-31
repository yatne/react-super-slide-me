import styled from "styled-components";
import {moveToMilliseconds} from "../store/timeLogic";

type ElementProps = CurrentElement & { boardSize: number };

export type ElementType =  "Start" | "End" | "Wall" | "Box" | "Void" | "GreenField" | "RedField" | "AltStart" | "AltEnd" | "BlueBox" | "BluePath";
type ElementState = "Triggered" | "Default" | "Void";

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
  z-index: ${props => props.state === "Void" ? '200' : '300'};
`

export const AltStartElement = styled(StyledElement)`
  box-shadow: inset 0 0 5px 1px #420049;
  border-radius: 50%;
  background-color: #dc2ed9;
  z-index: ${props => props.state === "Void" ? '200' : '300'};
`

export const WallElement = styled(StyledElement)`
  box-shadow: inset 0 0 5px 1px #252525;
  border-radius: 5%;
  background-color: #484848;
  z-index: 300;
`

export const BoxElement = styled(StyledElement)`
  box-shadow: inset 0 0 5px 1px #252525;
  border-radius: 22%;
  background-color: #7a4600;
  z-index: ${props => props.state === "Void" ? '200' : '300'};
`

export const EndElement = styled(StyledElement)`
  box-shadow: inset 0 0 5px ${props => props.state === "Triggered" ? '1px #001249' : '8px #2e57dc'}; 
  border-radius: 5%;
  background-color: ${props => props.state === "Triggered" ? '#2e57dc' : '#f6f6f6'};
  transition-delay: ${props => moveToMilliseconds(props, props.boardSize)}ms;
  z-index: 500;
`

export const AltEndElement = styled(StyledElement)`
  box-shadow: inset 0 0 5px ${props => props.state === "Triggered" ? '1px #001249' : '8px #dc2ed9'}; 
  border-radius: 5%;
  background-color: ${props => props.state === "Triggered" ? '#dc2ed9' : '#f6f6f6'};
  transition-delay: ${props => moveToMilliseconds(props, props.boardSize)}ms;
  z-index: 500;
`

export const GreenFieldElement = styled(StyledElement)<ElementProps>`
  box-shadow: inset 0 0 5px 1px ${props => props.state === "Triggered" ? '#252525' : '#2e7200'};
  background-color: ${props => props.state === "Triggered" ? '#2e7200' : '#ccffc5'};
  border-radius: ${props => props.state === "Triggered" ? '5%' : '0'};
  transition-delay: ${props => moveToMilliseconds(props, props.boardSize)}ms;
`

export const RedFieldElement = styled(StyledElement)<ElementProps>`
  box-shadow: inset 0 0 5px 1px #818181;
  background-color: ${props => props.state === "Triggered" ? '#ffc5c5' : 'rgba(250,0,0,0.75)'};
  transition-delay: ${props => moveToMilliseconds(props, props.boardSize)}ms;
  z-index: ${props => props.state === "Triggered" ? '250' : '100'};
`

export const BlueBoxElement = styled(StyledElement)`
  box-shadow: inset 0 0 5px 1px #252525;
  border-radius: 22%;
  background-color: #06525e;
  z-index: ${props => props.state === "Void" ? '200' : '300'};
`

export const BluePathElement = styled(StyledElement)<ElementProps>`
  box-shadow: inset 0 0 5px 1px #709696;
  background-color: #11ddff;
  transition-delay: ${props => moveToMilliseconds(props, props.boardSize)}ms;
`

export const VoidElement = styled(StyledElement)`
  display: none;
`

export default StyledElement
