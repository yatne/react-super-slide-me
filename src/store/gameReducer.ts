import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {CurrentLevel, Level} from '../SuperSlideMe'
import {move, sortByRenderOrder} from "./movementLogic";
import {Element, CurrentElement} from "../components/StyledElements";

// Define a type for the slice state
export interface GameState {
  levels: Level[],
  currentLevelNumber: number,
  currentLevelState: CurrentLevel | null,
  endGameReached: boolean,
}

// Define the initial state using that type
const initialState: GameState = {
  levels: [],
  currentLevelNumber: 0,
  currentLevelState: null,
  endGameReached: false,
}

const transformToCurrentLevel = (level: Level, index: number): CurrentLevel => {
  return {
    boardSize: level.boardSize,
    number: index,
    elements: level.elements.map((element, index) => transformToCurrentElement(element, index)),
  }
}

const transformToCurrentElement = (element: Element, index: number): CurrentElement => {
  return {
    ...element,
    previousPosX: element.posX,
    previousPosY: element.posY,
    renderOrder: index
  }
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    loadLevels: (state, action:PayloadAction<Level[]>) => {
      state.levels = action.payload;
    },
    startLevel: (state, action: PayloadAction<number>) => {
      state.currentLevelState = transformToCurrentLevel(state.levels[action.payload], action.payload);
      state.endGameReached = false;
      state.currentLevelNumber = action.payload;
      sortByRenderOrder(state.currentLevelState.elements)
    },
    nextLevel: (state, action: PayloadAction) => {
      if (state.currentLevelNumber + 1 >= state.levels.length) {
        state.endGameReached = true;
      } else {
        state.currentLevelNumber = state.currentLevelNumber + 1;
        state.currentLevelState = transformToCurrentLevel(state.levels[state.currentLevelNumber], state.currentLevelNumber);
        sortByRenderOrder(state.currentLevelState.elements);
      }
    },
    previousLevel: (state, action: PayloadAction) => {
      if (state.currentLevelNumber > 0) {
        state.currentLevelNumber = state.currentLevelNumber - 1;
        state.currentLevelState = transformToCurrentLevel(state.levels[state.currentLevelNumber], state.currentLevelNumber);
        sortByRenderOrder(state.currentLevelState.elements);
      }
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
