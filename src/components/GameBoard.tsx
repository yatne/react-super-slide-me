import * as React from 'react';
import styled from 'styled-components';
import BoardTile from "./BoardTile";
import {
  AltEndElement,
  AltStartElement, BlueBoxElement, BluePathElement,
  BoxElement, CrusherElement,
  EndElement, GreenFieldElement, OrangeWallElement, RedFieldElement,
  StartElement, VoidElement,
  WallElement
} from "./StyledElements";
import {AppDispatch, Level, RootState} from "../SuperSlideMe";
import {useDispatch, useSelector, useStore} from "react-redux";
import {gameSlice} from "../store/gameReducer";
import {useEffect, useMemo, useRef, useState} from "react";
import {longestMove} from "../store/timeLogic";
import {useSwipeable} from "react-swipeable";

interface ContainerProps {
  theme: any;
}

interface Props {
  onLevelFinish: () => void;
  onLastLevelReached: (() => unknown) | undefined;
}

const BoardContainer = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  width: ${props => props.theme.width ? props.theme.width : '400px'};
  height: ${props => props.theme.width ? props.theme.width : '400px'};
  background-color: white;
  padding: ${props => props.theme.gameBoardMargin} ;
  cursor: pointer;
`

export const GameBoard = (props : Props) => {
  const currentLevel = useSelector((state: RootState) => state.game.currentLevelState)

  const fields = useMemo(() => {
    const fs = []
    if (currentLevel !== null) {
      for (let i = 0; i < currentLevel.boardSize * currentLevel.boardSize; i++) {
        fs.push(i);
      }
    }
    return fs;
  }, [currentLevel]);


  useEffect(() => {
    if (!currentLevel?.elements.find(element => ["Start", "AltStart"].includes(element.type) && element.state !== "Triggered")) {
      props.onLevelFinish();
    }
  }, [currentLevel])


  return (
    <BoardContainer>
      {currentLevel ? (
        <>
          {fields.map((fieldNr) =>
            <BoardTile key={fieldNr} boardSize={currentLevel.boardSize}/>
          )}
          {currentLevel.elements.map((element, index)=> {
            const eleProps = {
              ...element,
              key: index,
              boardSize: currentLevel.boardSize,
            }
            switch (element.type) {
              case "Box":
                return <BoxElement {...eleProps} />
              case "Start":
                return <StartElement {...eleProps} />
              case "End":
                return <EndElement {...eleProps} />
              case "Wall":
                return <WallElement {...eleProps} />
              case "Void":
                return <VoidElement {...eleProps} />
              case "GreenField":
                return <GreenFieldElement {...eleProps} />
              case "RedField":
                return <RedFieldElement {...eleProps} />
              case "AltStart":
                return <AltStartElement {...eleProps} />
              case "AltEnd":
                return <AltEndElement {...eleProps} />
              case "BlueBox":
                return <BlueBoxElement {...eleProps} />
              case "BluePath":
                return <BluePathElement {...eleProps} />
              case "Crusher":
                return <CrusherElement {...eleProps} />
              case "OrangeWall":
                return <OrangeWallElement {...eleProps} />
            }
          })}
        </>
      ) : (
        <div>Loading...</div>
      )
      }
    </BoardContainer>
  )
}
