import * as React from 'react';
import {ThemeProvider} from "styled-components";
import {theme} from "./components/theme";
import {Provider} from "react-redux";
import { configureStore} from "@reduxjs/toolkit";
import gameReducer from "./store/gameReducer";
import {CurrentElement, Element} from "./components/StyledElements";
import {Game} from "./components/Game";
import {ReadableLevel} from "./store/levels";
import {useEffect, useMemo, useState} from "react";

export interface LevelConfig {
  levelSets?: levelSet[],
  levelFilter?: levelFilter,
}

export type levelSet = "A" | "B" | "C" | "X";
export type levelFilter = "all" | "onlyEasy" | "onlyHard" | "short" | "onlyCustom";

interface GameProps {
  width: number;
  onLastLevelReached?: () => unknown,
  levelConfig?: LevelConfig,
  customLevels?: ReadableLevel[],
  id?: string,
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

let store = configureStore({
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

const createSomeId = (id: string | undefined, levelConfig: LevelConfig | undefined, customLevels: string[] | undefined): string => {
  if (id) {
    return id;
  }
  const levelSetsPart = levelConfig?.levelSets ? levelConfig.levelSets.join("-") : "all-sets";
  const levelFilterPart = levelConfig?.levelFilter ? levelConfig.levelFilter : "all-levels";
  const customLevelsPart = customLevels? customLevels?.join("-") : "no-custom-levels";

  return `${levelSetsPart}-${levelFilterPart}-${customLevelsPart}`;
}

export const SuperSlideMe = ({width, onLastLevelReached, customLevels, levelConfig, id}: GameProps) => {
  const gameId = useMemo(() => createSomeId(id, levelConfig, customLevels), [id, levelConfig, customLevels]);
  const [gameWidth, setGameWidth] = useState(width);
  const [gameBoardMargin, setGameBoardMargin] = useState(Math.floor(width/25));
  const [buttonFontSize, setButtonFontSize] = useState(1);

  useEffect(() => {
    setCurrentWidth();
    addEventListener('resize', setCurrentWidth);
    return () => removeEventListener("resize", setCurrentWidth);
  }, [])

  const setCurrentWidth = () => {
    const parentNodeWidth = document?.getElementById(gameId)?.parentElement?.clientWidth;
    const calculatedGameWidth = width || parentNodeWidth || 400;
    setGameWidth(calculatedGameWidth);
    setGameBoardMargin(Math.floor(calculatedGameWidth/25));
    setButtonFontSize(Math.floor(calculatedGameWidth/35));
  }

  return (
    <div id={gameId}>
      <Provider store={store}>
        <ThemeProvider theme={theme({
          width: `${gameWidth - 2*gameBoardMargin}px`,
          gameBoardMargin: `${gameBoardMargin}px`,
          buttonFontSize: `${buttonFontSize}px`,
        })}>
          <Game
            gameId={gameId}
            onLastLevelReached={onLastLevelReached}
            levelConfig={levelConfig || defaultLevelConfig}
            customLevels={customLevels || []}
          />
        </ThemeProvider>
      </Provider>
    </div>
  )
}
