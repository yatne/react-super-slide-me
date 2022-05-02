interface Parameters {
  width: string;
}

export const theme = (parameters: Parameters) => {
  return {
    width: parameters.width,
    gameBoardMargin: '20px',
  }
}
