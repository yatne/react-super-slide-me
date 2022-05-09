import * as React from 'react';
import {GameBoard} from "./components/GameBoard";
import {ThemeProvider} from "styled-components";
import {theme} from "./components/theme";
import {Provider} from "react-redux";
import {applyMiddleware, compose, configureStore} from "@reduxjs/toolkit";
import gameReducer, {gameSlice} from "./store/gameReducer";
import {Element} from "./components/StyledElement";

interface GameProps {
  levels: Level[],
  gameName?: string,
  width: string;
}

export interface Level {
  elements: Element[],
  boardSize: number,
  name?: string,
}

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const SuperSlideMe = (props: GameProps) => {
  // useEffect(() => {
  //   gameSlice.actions.loadLevels(props.levels);
  // }, [store])

  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={theme({width: props.width})}>
          {props.gameName}
          <GameBoard/>
        </ThemeProvider>
      </Provider>
    </div>
  )
}
