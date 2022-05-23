import * as React from 'react';
import {GameBoard} from "./GameBoard";
import {useEffect} from "react";
import {gameSlice} from "../store/gameReducer";
import {prepareLevels, ReadableLevel} from "../store/levels";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, LevelConfig, RootState} from "../SuperSlideMe";
import {Controls} from "./Controls";

interface Props {
  onLastLevelReached: (() => unknown) | undefined;
  levelConfig: LevelConfig,
  customLevels: ReadableLevel[],
}

export const Game = (props : Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const currentLevel = useSelector((state: RootState) => state.game.currentLevelState)
  const maxLevel = useSelector((state: RootState) => state.game.unlockedLevel)
  const levelCount = useSelector((state: RootState) => state.game.levels.length)

  useEffect(() => {
    dispatch(gameSlice.actions.loadLevels(prepareLevels(props.levelConfig, props.customLevels)));
    dispatch(gameSlice.actions.startLevel(maxLevel));
  }, [])

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
    <div>
      <GameBoard onLevelFinish={onLevelFinished} onLastLevelReached={props.onLastLevelReached}/>
      <Controls />
    </div>
  )
}
