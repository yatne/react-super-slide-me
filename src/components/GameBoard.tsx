import * as React from 'react';
import styled from 'styled-components';
import BoardTile from "./BoardTile";
import {
  BoxElement,
  EndElement, GreenFieldElement,
  StartElement, VoidElement,
  WallElement
} from "./StyledElements";
import {AppDispatch, Level, RootState} from "../SuperSlideMe";
import {useDispatch, useSelector, useStore} from "react-redux";
import {gameSlice} from "../store/gameReducer";
import {useEffect, useState} from "react";
import {longestMove} from "../store/timeLogic";
import {useSwipeable} from "react-swipeable";

interface ContainerProps {
  theme: any;
}

interface Props {
  onLevelFinish: () => void;
  onLastLevelReached: (() => unknown) | undefined;
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

export const GameBoard = (props : Props) => {
  const currentLevel = useSelector((state: RootState) => state.game.currentLevelState)
  const dispatch = useDispatch<AppDispatch>()
  const fields = [];
  const [blocked, setBlocked] = useState(false);
  const [blockStart, setBlockStart] = useState(false);
  const handlers = useSwipeable({
    onSwipedLeft: () => moveLeft(),
    onSwipedRight: () => moveRight(),
    onSwipedUp: () => moveUp(),
    onSwipedDown: () => moveDown(),
    trackMouse: true,
  });

  const blockedRef = React.useRef(blocked);
  const setBlock = (block: boolean) => {
    blockedRef.current = block;
    setBlocked(block);
  };

  const startBlockade = (moveTime: number) => {
    setTimeout(() => {
      setBlock(false);
    }, Math.max(moveTime-100, 0))
  }

  if (blockStart) {
    if (currentLevel === null) return null;
    const moveTime = longestMove(currentLevel.elements, currentLevel.boardSize);
    setBlockStart(false);
    setBlock(true);
    startBlockade(moveTime);
  }

  const moveLeft = () => {
    dispatch(gameSlice.actions.moveLeft());
    setBlockStart(true);
  }

  const moveRight = () => {
    dispatch(gameSlice.actions.moveRight());
    setBlockStart(true);
  }

  const moveUp = () => {
    dispatch(gameSlice.actions.moveUp());
    setBlockStart(true);
  }

  const moveDown = () => {
    dispatch(gameSlice.actions.moveDown());
    setBlockStart(true);
  }

  useEffect(() => {
    const arrowEventListenerFunction = (e: KeyboardEvent) => {
      if (!blockedRef.current) {
        switch (e.key) {
          case "ArrowUp":
            moveUp();
            break;
          case "ArrowDown":
            moveDown();
            break;
          case "ArrowLeft":
            moveLeft();
            break;
          case "ArrowRight":
            moveRight();
            break;
        }
      }
    }

    document.addEventListener('keydown', arrowEventListenerFunction);
    return () => {
      document.removeEventListener('keydown', arrowEventListenerFunction)
    }
  }, []);

  if (currentLevel !== null) {
    for (let i = 0; i < currentLevel.boardSize * currentLevel.boardSize; i++) {
      fields.push(i);
    }
  }

  useEffect(() => {
    if (!currentLevel?.elements.find(element => element.type === "Start" && element.state !== "Triggered" )) {
      props.onLevelFinish();
    }
  }, [currentLevel])


  return (
    <BoardContainer {...handlers}>
      {currentLevel ? (
        <>
          {fields.map((fieldNr) =>
            <BoardTile key={fieldNr} boardSize={currentLevel.boardSize}/>
          )}
          {currentLevel.elements.map(element => {
            const eleProps = {
              ...element,
              boardSize: currentLevel.boardSize,
            }
            switch (element.type) {
              case "Box":
                return <BoxElement {...eleProps} />
              case "Start":
                return <StartElement {...eleProps} />
              case "End":
                return <EndElement {...eleProps} />
              case "Wall":
                return <WallElement {...eleProps} />
              case "Void":
                return <VoidElement {...eleProps} />
              case "GreenField":
                return <GreenFieldElement {...eleProps} />
            }
          })}
        </>
      ) : (
        <div>Loading...</div>
      )
      }
    </BoardContainer>
  )
}
