import * as React from 'react';
import styled from 'styled-components';
import BoardTile from "./BoardTile";
import StyledElement, {Element} from "./StyledElement";
import {AppDispatch, Level, RootState} from "../SuperSlideMe";
import {useDispatch, useSelector, useStore} from "react-redux";
import {gameSlice} from "../store/gameReducer";
import {useEffect} from "react";

interface Props {
  level: Level,
}

interface ContainerProps {
  theme: any;
}

const BoardContainer = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  width: ${props => props.theme.width ? props.theme.width : '400px'};
  height: ${props => props.theme.width ? props.theme.width : '400px'};
  background-color: white;
  padding: ${props => props.theme.gameBoardMargin} ;
`

export const GameBoard = () => {
  const currentLevel = useSelector((state: RootState) => state.game.currentLevelState)
  const dispatch = useDispatch<AppDispatch>()
  const fieldRows = [];

  useEffect(() => {
    // dispatch(gameSlice.actions.assignRenderOrder())
  }, [])

  for (let i = 0 ; i < currentLevel.boardSize; i++) {
    const row = [];
    for (let j = 0 ; j < currentLevel.boardSize; j++) {
      row.push('');
    }
    fieldRows.push(row);
  }

  let elements: Element[] = [...currentLevel.elements];
  elements.sort((e1: Element, e2: Element) => {
    if (!e1.renderOrder || !e2.renderOrder) return 0;
    return e1.renderOrder > e2.renderOrder ? 1 : e1.renderOrder === e2.renderOrder ? 0 : -1;
  });

  return (
    <>
      <BoardContainer>
        {fieldRows.map(row =>
          row.map(() =>
            <BoardTile boardSize={currentLevel.boardSize} />
          )
        )}
        {elements.map(element =>
            <StyledElement
              key={element.renderOrder}
              posY={element.posY}
              posX={element.posX}
              boardSize={currentLevel.boardSize}
              type={element.type}
              previousPosY={element.previousPosY}
              previousPosX={element.previousPosX}
            />
          )
        }
      </BoardContainer>
      <button onClick={() => {dispatch(gameSlice.actions.moveLeft())}}>lewo</button>
      <button onClick={() => {dispatch(gameSlice.actions.moveRight())}}>prawo</button>
      <button onClick={() => {dispatch(gameSlice.actions.moveUp())}}>góra</button>
      <button onClick={() => {dispatch(gameSlice.actions.moveDown())}}>dół</button>
    </>
  )
}
