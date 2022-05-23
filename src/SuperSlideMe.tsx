import * as React from 'react';
import {ThemeProvider} from "styled-components";
import {theme} from "./components/theme";
import {Provider} from "react-redux";
import { configureStore} from "@reduxjs/toolkit";
import gameReducer from "./store/gameReducer";
import {CurrentElement, Element} from "./components/StyledElements";
import {Game} from "./components/Game";
import {ReadableLevel} from "./store/levels";

export interface LevelConfig {
  levelSets?: levelSet[],
  levelFilter?: levelFilter,
}

export type levelSet = "A" | "B" | "C" | "X";
export type levelFilter = "all" | "onlyEasy" | "onlyHard" | "short" | "onlyCustom";

interface GameProps {
  width: string;
  onLastLevelReached?: () => unknown,
  levelConfig?: LevelConfig,
  customLevels?: ReadableLevel[],
}

export interface Level {
  elements: Element[],
  boardSize: number,
}

export interface CurrentLevel {
  number: number,
  elements: CurrentElement[],
  boardSize: number,
}

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const defaultLevelConfig: LevelConfig = {
  levelSets: ["A", "B", "C", "X"],
  levelFilter: "all",
}

export const SuperSlideMe = ({width, onLastLevelReached, customLevels, levelConfig}: GameProps) => {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={theme({width: width})}>
          <Game
            onLastLevelReached={onLastLevelReached}
            levelConfig={levelConfig || defaultLevelConfig}
            customLevels={customLevels || []}
          />
        </ThemeProvider>
      </Provider>
    </div>
  )
}
