import * as React from 'react';
import {GameBoard} from "./GameBoard";
import {useEffect, useRef, useState} from "react";
import {gameSlice} from "../store/gameReducer";
import {prepareLevels, ReadableLevel} from "../store/levels";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, LevelConfig, RootState} from "../SuperSlideMe";
import {Controls} from "./Controls";
import {LevelCounter} from "./LevelCounter";
import {useSwipeable} from "react-swipeable";
import {longestMove} from "../store/timeLogic";
import styled from "styled-components";

interface Props {
  onLastLevelReached: (() => unknown) | undefined;
  levelConfig: LevelConfig,
  customLevels: ReadableLevel[],
  gameId: string,
}

const StyledGame = styled.div`
  &:focus-visible {
    outline: none;
  }
`

export const Game = (props : Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const currentLevel = useSelector((state: RootState) => state.game.currentLevelState)
  const levelCount = useSelector((state: RootState) => state.game.levels.length)
  const maxLevel = useSelector((state: RootState) => state.game.unlockedLevel)

  const currentLevelNumber = useSelector((state: RootState) => state.game.currentLevelNumber)

  const gameRef = useRef(null);
  const [blocked, setBlocked] = useState(false);
  const [blockStart, setBlockStart] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => moveLeft(),
    onSwipedRight: () => moveRight(),
    onSwipedUp: () => moveUp(),
    onSwipedDown: () => moveDown(),
    trackMouse: true,
    trackTouch: true,
    preventScrollOnSwipe: true,
    delta: 4,
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
            e.preventDefault()
            moveUp();
            break;
          case "ArrowDown":
            e.preventDefault()
            moveDown();
            break;
          case "ArrowLeft":
            moveLeft();
            break;
          case "ArrowRight":
            moveRight();
            break;
          case "R":
            gameSlice.actions.startLevel(currentLevelNumber);
            break;
        }
      }
    }

    // @ts-ignore
    gameRef.current.addEventListener('keydown', arrowEventListenerFunction);
    dispatch(gameSlice.actions.loadLevels(prepareLevels(props.levelConfig, props.customLevels)));
    dispatch(gameSlice.actions.setGameId(props.gameId));
  }, [])

  useEffect(() => {
    dispatch(gameSlice.actions.startLevel(maxLevel));
  }, [maxLevel]);

  const onLevelFinished = () => {
    setTimeout(() => {
      if (currentLevel !== null) {
        dispatch(gameSlice.actions.startLevel(currentLevel?.number + 1))
        if (currentLevel?.number === levelCount - 2 && props.onLastLevelReached) {
          props.onLastLevelReached();
        }
      }
    }, 1000)
  }

  return (
    <StyledGame  {...handlers} ref={gameRef} tabIndex={0}>
      <LevelCounter />
      <GameBoard onLevelFinish={onLevelFinished} onLastLevelReached={props.onLastLevelReached}/>
      <Controls />
    </StyledGame>
  )
}
