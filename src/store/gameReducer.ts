import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {Level} from '../SuperSlideMe'
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
    boardSize: 7,
    elements: [
      {type: "Start", posX: 0, posY: 0, renderOrder: 0},
      {type: "Wall", posX: 1, posY: 1, renderOrder: 1},
      {type: "Wall", posX: 2, posY: 1, renderOrder: 2},
      {type: "Wall", posX: 3, posY: 1, renderOrder: 3},
      {type: "Wall", posX: 0, posY: 1, renderOrder: 4},
      {type: "End", posX: 0, posY: 2, renderOrder: 5, state: "Default"},
      {type: "Box", posX: 0, posY: 4, renderOrder: 6},
      {type: "Box", posX: 1, posY: 4, renderOrder: 7},
      {type: "GreenField", posX: 4, posY: 4, renderOrder: 8, state: "Default"},
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
