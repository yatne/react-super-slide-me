import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {Level, RootState} from '../SuperSlideMe'
import {move, sortByRenderOrder} from "./movementLogic";

// Define a type for the slice state
export interface GameState {
  levels: Level[],
  currentLevelNumber: number,
  currentLevelState: Level,
}

// Define the initial state using that type
const initialState: GameState = {
  levels: [],
  currentLevelNumber: 0,
  currentLevelState: {
    boardSize: 5,
    elements: [
      {type: "Start", posX: 0, posY: 0, renderOrder: 0},
      {type: "Wall", posX: 0, posY: 1, renderOrder: 1},
      {type: "End", posX: 1, posY: 1, renderOrder: 2},
    ]
  }
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    loadLevels: (state, action:PayloadAction<Level[]>) => {
      state.levels = action.payload;
      state.currentLevelNumber = 0;
      state.currentLevelState = action.payload[0];
    },
    moveRight: (state) => {
      state.currentLevelState.elements = move(state.currentLevelState.elements, 'Right', state.currentLevelState.boardSize)
    },
    moveLeft: (state) => {
      state.currentLevelState.elements = move(state.currentLevelState.elements, 'Left', state.currentLevelState.boardSize)
    },
    moveUp: (state) => {
      state.currentLevelState.elements = move(state.currentLevelState.elements, 'Up', state.currentLevelState.boardSize)
    },
    moveDown: (state) => {
      state.currentLevelState.elements = move(state.currentLevelState.elements, 'Down', state.currentLevelState.boardSize)
    },
    assignRenderOrder: (state) => {
      state.currentLevelState.elements.map((element, index) => {
        element.renderOrder = index;
      });
      sortByRenderOrder(state.currentLevelState.elements)
    }
  }
})

export const { loadLevels, moveRight, moveLeft, assignRenderOrder } = gameSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.game.value

export default gameSlice.reducer
