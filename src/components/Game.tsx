import * as React from 'react';
import {GameBoard} from "./GameBoard";
import {useEffect} from "react";
import {gameSlice} from "../store/gameReducer";
import {levels} from "../store/levels";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../SuperSlideMe";
import {Controls} from "./Controls";

export const Game = (props: {name: string}) => {
  const dispatch = useDispatch<AppDispatch>()
  const currentLevel = useSelector((state: RootState) => state.game.currentLevelState)
  const maxLevel = useSelector((state: RootState) => state.game.unlockedLevel)

  useEffect(() => {
    dispatch(gameSlice.actions.loadLevels(levels));
    dispatch(gameSlice.actions.startLevel(maxLevel));
  }, [])

  const onLevelFinished = () => {
    setTimeout(() => {
      if (currentLevel !== null)
      dispatch(gameSlice.actions.startLevel(currentLevel?.number + 1))
    }, 1000)
  }

  return (
    <div>
      {props.name}
      <GameBoard onLevelFinish={onLevelFinished}/>
      <Controls />
    </div>
  )
}
