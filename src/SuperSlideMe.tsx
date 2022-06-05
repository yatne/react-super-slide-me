import * as React from 'react';
import {ThemeProvider} from "styled-components";
import {theme} from "./components/theme";
import {Provider} from "react-redux";
import { configureStore} from "@reduxjs/toolkit";
import gameReducer, {GameState} from "./store/gameReducer";
import {CurrentElement, Element} from "./components/StyledElements";
import {Game} from "./components/Game";
import {ReadableLevel} from "./store/levels";

export interface LevelConfig {
  levelSets?: levelSet[],
  levelFilter?: levelFilter,
}

export type levelSet = "A" | "B" | "C" | "D" | "E" | "F" | "X";
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

let otherStore = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type RootState = {game: GameState}
export type AppDispatch = typeof otherStore.dispatch

const defaultLevelConfig: LevelConfig = {
  levelSets: ["A", "B", "C", "D", "E", "F", "X"],
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

export class SuperSlideMe extends React.Component<GameProps, any> {
  store;
  gameId: string;

  constructor(props: any) {
    super(props);
    this.store = configureStore({
      reducer: {
        game: gameReducer,
      },
    });
    this.state = {
      gameWidth: props.width,
      gameBoardMargin: Math.floor(props.width / 25),
      buttonFontSize: 1,
    }
    this.gameId = createSomeId(props.id, props.levelConfig, props.customLevels)
  }

  setCurrentWidth() {
    const parentNodeWidth = document?.getElementById(this.gameId)?.parentElement?.clientWidth;
    const calculatedGameWidth = this.props.width || parentNodeWidth || 400;
    this.setState({
      gameWidth: calculatedGameWidth,
      gameBoardMargin: Math.floor(calculatedGameWidth / 25),
      buttonFontSize: Math.floor(calculatedGameWidth/35),
    });
  }

  componentDidMount() {
    this.setCurrentWidth();
    addEventListener('resize', this.setCurrentWidth);
  }

  componentWillUnmount() {
    removeEventListener("resize", this.setCurrentWidth);
  }

  render() {
    return (
      <div id={this.gameId}>
        <Provider store={this.store}>
          <ThemeProvider theme={theme({
            width: `${this.state.gameWidth - 2 * this.state.gameBoardMargin}px`,
            gameBoardMargin: `${this.state.gameBoardMargin}px`,
            buttonFontSize: `${this.state.buttonFontSize}px`,
          })}>
            <Game
              gameId={this.gameId}
              onLastLevelReached={this.props.onLastLevelReached}
              levelConfig={this.props.levelConfig || defaultLevelConfig}
              customLevels={this.props.customLevels || []}
            />
          </ThemeProvider>
        </Provider>
      </div>
    )
  }
}
