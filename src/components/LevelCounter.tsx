import * as React from "react"
import {useSelector} from "react-redux";
import {RootState} from "../SuperSlideMe";
import styled from "styled-components";
import {useMemo} from "react";

interface ContainerProps {
  theme: any;
}

const LevelCounterContainer = styled.div<ContainerProps>`
  width: ${props => props.theme.width ? props.theme.width : '400px'};
  padding: ${props => props.theme.gameBoardMargin};
  display: flex;
  justify-content: center;
  font-size: 1rem;
`

const LevelCounterSpan = styled.span<ContainerProps>`
  background-color: #f6f6f6;
  color: #484848;
  line-height: 1.5;
  padding: 0 ${props => props.theme.gameBoardMargin};
`


export const LevelCounter: React.FC = () => {
  const currentLevelNumber = useSelector((state: RootState) => state.game.currentLevelNumber)
  const levelCount = useSelector((state: RootState) => state.game.levels.length)
  const isItEndLevel = useMemo(() => currentLevelNumber === levelCount - 1, [currentLevelNumber])

  return (
    <LevelCounterContainer>
      <LevelCounterSpan>
        {isItEndLevel ? 'The End' : `Level ${currentLevelNumber + 1} / ${levelCount - 1}`}
      </LevelCounterSpan>
    </LevelCounterContainer>
  )
}
