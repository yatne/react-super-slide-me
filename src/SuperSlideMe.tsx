import * as React from 'react';
import {ThemeProvider} from "styled-components";
import {theme} from "./components/theme";
import {Provider} from "react-redux";
import { configureStore} from "@reduxjs/toolkit";
import gameReducer from "./store/gameReducer";
import {Element} from "./components/StyledElement";
import {Game} from "./components/Game";

interface GameProps {
  levels: Level[],
  gameName: string,
  width: string;
}

export interface Level {
  elements: Element[],
  boardSize: number,
  name?: string,
  number: number,
}

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const SuperSlideMe = (props: GameProps) => {

  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={theme({width: props.width})}>
          <Game name={props.gameName} />
        </ThemeProvider>
      </Provider>
    </div>
  )
}
