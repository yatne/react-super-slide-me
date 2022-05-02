import * as React from 'react';
import styled from 'styled-components';
import BoardTile from "./BoardTile";
import StyledElement, {Element, EndElement, StartElement, WallElement} from "./StyledElement";
import {AppDispatch, Level, RootState} from "../SuperSlideMe";
import {useDispatch, useSelector, useStore} from "react-redux";
import {gameSlice} from "../store/gameReducer";
import {useEffect, useState} from "react";

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
  const [blocked, setBlocked] = useState(false);

  const blockedRef = React.useRef(blocked);
  const setBlock = (block: boolean) => {
    blockedRef.current = block;
    setBlocked(block);
  };

  useEffect(() => {
    const arrowEventListenerFunction = (e: KeyboardEvent) => {
      if (!blockedRef.current) {
        switch (e.key) {
          case "ArrowUp":
            dispatch(gameSlice.actions.moveUp());
            startBlockade();
            break;
          case "ArrowDown":
            dispatch(gameSlice.actions.moveDown());
            startBlockade();
            break;
          case "ArrowLeft":
            dispatch(gameSlice.actions.moveLeft());
            startBlockade();
            break;
          case "ArrowRight":
            dispatch(gameSlice.actions.moveRight());
            startBlockade();
            break;
        }
      }
    }

    document.addEventListener('keydown', arrowEventListenerFunction);
    return () => {
      document.removeEventListener('keydown', arrowEventListenerFunction)
    }
  }, [])

  const startBlockade = () => {
  setBlock(true);
  setTimeout(() => {
    setBlock(false);
  }, 400)
  }

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
        {elements.map(element => {
          const eleProps = {
            ...element,
            boardSize: currentLevel.boardSize,
          }

          switch (element.type) {
            case "Start":
              return <StartElement {...eleProps} />
            case "End":
              return <EndElement {...eleProps} />
            case "Wall":
              return <WallElement {...eleProps} />
          }
        }
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
