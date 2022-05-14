import * as React from "react"
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../SuperSlideMe";
import {gameSlice} from "../store/gameReducer";

export const Controls: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const currentLevelNumber = useSelector((state: RootState) => state.game.currentLevelNumber)
  const maxLevel = useSelector((state: RootState) => state.game.unlockedLevel)

  const handleNextLevel = () => {
    dispatch(gameSlice.actions.nextLevel())
  }

  const handlePreviousLevel = () => {
    dispatch(gameSlice.actions.previousLevel())
  }

  return (
    <div>
      <button disabled={currentLevelNumber === maxLevel} onClick={handleNextLevel}>Next Level</button>
      <button disabled={currentLevelNumber === 0} onClick={handlePreviousLevel}>Previous Level</button>
      <button onClick={() => dispatch(gameSlice.actions.startLevel(currentLevelNumber))}>Reset</button>
    </div>
  )
}
