import styled from "styled-components";

export interface TileProps {
  boardSize: number;
}

const BoardTile = styled.div<TileProps>`
  width: calc(${props => props.theme.width ? props.theme.width : '400px'} / ${props => props.boardSize});
  padding-bottom: calc(${props => props.theme.width ? props.theme.width : '400px'} / ${props => props.boardSize});
  height: 0;
  flex: 0 0 auto;
  box-shadow: inset 0 0 5px 1px #818181;
  background-color: #f6f6f6;
`

export default BoardTile;
