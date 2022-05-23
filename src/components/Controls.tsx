import * as React from "react"
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../SuperSlideMe";
import {gameSlice} from "../store/gameReducer";
import styled from "styled-components";

interface ContainerProps {
  theme: any;
}

const StyledButton = styled.button`
  box-shadow: 0 0 5px 1px #818181;
  background-color: #f6f6f6;
  height: 2rem;
  padding: 0 1rem;
  font-size: 1rem;
  color: #2e57dc;
  width: 100%;
  
  &:hover {
    background-color: #e6e6e6;
  }
  
  &:active {
    background-color: #d6d6d6;
  }
`

const ButtonPlace = styled.div`
  width: 30%;
`

const InfoPlace = styled.div`
  width: 100%;
  background-color: #f6f6f6;
  color: #484848;
  font-size: 1rem;
  line-height: 2;
`

const ControlsContainer = styled.div<ContainerProps>`
  width: ${props => props.theme.width ? props.theme.width : '400px'};
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: ${props => props.theme.gameBoardMargin};
  flex-wrap: wrap;
`

export const Controls: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const currentLevelNumber = useSelector((state: RootState) => state.game.currentLevelNumber)
  const maxLevel = useSelector((state: RootState) => state.game.unlockedLevel)

  const handleNextLevel = () => {
    dispatch(gameSlice.actions.nextLevel())
  }

  const handlePreviousLevel = () => {
    dispatch(gameSlice.actions.previousLevel())
  }

  return (
    <ControlsContainer>
      {currentLevelNumber < 2 && (
        <InfoPlace>
          Use Arrow Keys to move around (or swipe if you're on mobile)
        </InfoPlace>
      )}
      <ButtonPlace>
        {currentLevelNumber > 0 && (
          <StyledButton disabled={currentLevelNumber === 0} onClick={handlePreviousLevel}>Previous Level</StyledButton>
        )}
      </ButtonPlace>
      <ButtonPlace>
        <StyledButton onClick={() => dispatch(gameSlice.actions.startLevel(currentLevelNumber))}>Reset</StyledButton>
      </ButtonPlace>
      <ButtonPlace>
        {currentLevelNumber !== maxLevel && (
          <StyledButton
            disabled={currentLevelNumber === maxLevel}
            onClick={handleNextLevel}
          >
            Next Level
          </StyledButton>
        )}
      </ButtonPlace>
    </ControlsContainer>
  )
}
