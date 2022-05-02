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

const StyledElement = styled.div<ElementProps>`
  position: absolute;
  top: calc(${props => props.theme.gameBoardMargin} + ${props => props.posY} * ${props => props.theme.width ? props.theme.width : '400xp'} / ${props => props.boardSize});
  left: calc(${props => props.theme.gameBoardMargin} + ${props => props.posX} * ${props => props.theme.width ? props.theme.width : '400xp'} / ${props => props.boardSize});
  width: calc(${props => props.theme.width ? props.theme.width : '400xp'} / ${props => props.boardSize});
  padding-bottom: calc(${props => props.theme.width ? props.theme.width : '400px'} / ${props => props.boardSize});
  height: 0;

  box-shadow: inset 0 0 5px 1px #001249;
  border-radius: 50%;
  background-color: ${props => props.type === 'Start' ? '#2e57dc' : '#c61fe1'};
  transition: 1s linear;
`

export default StyledElement
