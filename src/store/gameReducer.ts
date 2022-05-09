import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {Level} from '../SuperSlideMe'
import {move, sortByRenderOrder} from "./movementLogic";

// Define a type for the slice state
export interface GameState {
  levels: Level[],
  currentLevelNumber: number,
  currentLevelState: Level | null,
}

// Define the initial state using that type
const initialState: GameState = {
  levels: [],
  currentLevelNumber: 0,
  currentLevelState: null
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    loadLevels: (state, action:PayloadAction<Level[]>) => {
      state.levels = action.payload;
    },
    startLevel: (state, action: PayloadAction<number>) => {
      state.currentLevelState = {...state.levels[action.payload]}
      state.currentLevelState.elements.map((element, index) => {
        element.renderOrder = index;
      });
      sortByRenderOrder(state.currentLevelState.elements)
    },
    moveRight: (state) => {
      if (state.currentLevelState === null ) return
      state.currentLevelState.elements = move(state.currentLevelState.elements, 'Right', state.currentLevelState.boardSize)
    },
    moveLeft: (state) => {
      if (state.currentLevelState === null ) return
      state.currentLevelState.elements = move(state.currentLevelState.elements, 'Left', state.currentLevelState.boardSize)
    },
    moveUp: (state) => {
      if (state.currentLevelState === null ) return
      state.currentLevelState.elements = move(state.currentLevelState.elements, 'Up', state.currentLevelState.boardSize)
    },
    moveDown: (state) => {
      if (state.currentLevelState === null ) return
      state.currentLevelState.elements = move(state.currentLevelState.elements, 'Down', state.currentLevelState.boardSize)
    },
  }
})

export const { loadLevels, startLevel, moveRight, moveLeft, moveUp, moveDown} = gameSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.game.value

export default gameSlice.reducer
