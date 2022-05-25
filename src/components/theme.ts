interface Parameters {
  width: string;
  gameBoardMargin: string;
  buttonFontSize: string;
}

export const theme = (parameters: Parameters) => {
  return {
    width: parameters.width,
    gameBoardMargin: parameters.gameBoardMargin,
    buttonFontSize: parameters.buttonFontSize,
  }
}
