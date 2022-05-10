import * as React from 'react';
import {GameBoard} from "./GameBoard";
import {useEffect} from "react";
import {gameSlice} from "../store/gameReducer";
import {levels} from "../store/levels";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../SuperSlideMe";

export const Game = (props: {name: string}) => {
  const dispatch = useDispatch<AppDispatch>()
  const currentLevel = useSelector((state: RootState) => state.game.currentLevelState)

  useEffect(() => {
    dispatch(gameSlice.actions.loadLevels(levels));
    dispatch(gameSlice.actions.startLevel(0));
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
    </div>
  )
}
