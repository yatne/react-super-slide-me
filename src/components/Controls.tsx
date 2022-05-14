import * as React from "react"
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../SuperSlideMe";
import {gameSlice} from "../store/gameReducer";

export const Controls: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const currentLevelNumber = useSelector((state: RootState) => state.game.currentLevelNumber)

  const handleNextLevel = () => {
    dispatch(gameSlice.actions.nextLevel())
  }

  const handlePreviousLevel = () => {
    dispatch(gameSlice.actions.previousLevel())
  }

  return (
    <div>
      <button onClick={handleNextLevel}>Next Level</button>
      <button onClick={handlePreviousLevel}>Previous Level</button>
      <button onClick={() => dispatch(gameSlice.actions.startLevel(currentLevelNumber))}>Reset</button>
    </div>
  )
}
