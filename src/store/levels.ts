import {Level, LevelConfig} from "../SuperSlideMe";
import {ElementType, Element} from "../components/StyledElements";
import {AEasy} from "./levelPacks/a-easy";
import {AHard} from "./levelPacks/a-hard";
import {BEasy} from "./levelPacks/b-easy";
import {BHard} from "./levelPacks/b-hard";
import {CEasy} from "./levelPacks/c-easy";
import {CHard} from "./levelPacks/c-hard";
import {XHard} from "./levelPacks/x-hard";

export type ReadableLevel = string;

const availableLevels = {
  setA: {
    easy: AEasy,
    hard: AHard,
  },
  setB: {
    easy: BEasy,
    hard: BHard,
  },
  setC: {
    easy: CEasy,
    hard: CHard,
  },
  setX: {
    easy: [],
    hard: XHard,
  }
}

const endLevel: ReadableLevel =
  '.............' +
  '.xxx.x.x.xxx.' +
  '..x..x.x.x...' +
  '..x..xxx.xx..' +
  '..x..x.x.x...' +
  '..x..x.x.xxx.' +
  '......s......' +
  '.xxx.xxx.xx..' +
  '.x...x.x.x.x.' +
  '.xx..x.x.x.x.' +
  '.x...x.x.x.x.' +
  '.xxx.x.x.xx..' +
  '.............';

const loadLevelsByConfig = (config: LevelConfig, additionalLevels: ReadableLevel[]): ReadableLevel[] => {
  const levels: ReadableLevel[] = [];
  if (config.levelSets === undefined) {
    config.levelSets = ["A", "B", "C", "X"];
  }
  config.levelSets?.forEach((levelSet) => {
    switch (levelSet) {
      case "A":
        levels.push(...loadLevelSetByConfig(config, availableLevels.setA));
        break
      case "B":
        levels.push(...loadLevelSetByConfig(config, availableLevels.setB));
        break
      case "C":
        levels.push(...loadLevelSetByConfig(config, availableLevels.setC));
        break
      case "X":
        if (config.levelFilter !== "short") {
          levels.push(...loadLevelSetByConfig(config, availableLevels.setX))
        }
    }
  })
  levels.push(...additionalLevels)
  levels.push(endLevel);
  return levels;
}

const loadLevelSetByConfig = (config: LevelConfig, levelSet: {easy: ReadableLevel[], hard: ReadableLevel[]}): ReadableLevel[] => {
  switch (config.levelFilter) {
    case "all":
      return levelSet.easy.concat(levelSet.hard);
    case "onlyEasy":
      return levelSet.easy;
    case "onlyHard":
      return levelSet.hard;
    case "short":
      return [levelSet.easy[0], levelSet.easy[1], levelSet.hard[0], levelSet.hard[1]];
    case "onlyCustom":
      return [];
    default:
      return levelSet.easy.concat(levelSet.hard);
  }
}

const transformLevels = (rLevels: ReadableLevel[]): Level[] => {
  return rLevels.map(rLevel => transformLevel(rLevel));
}

const transformLevel = (rLevel: ReadableLevel): Level => {
  const boardSize = Math.sqrt(rLevel.length);
  if (!Number.isInteger(boardSize)) {
    throw new Error("One of the levels is not a square!")
  }
  const elements = []
  for (let i = 0; i < rLevel.length; i++) {
    if (rLevel[i] !== '.') {
      elements.push(createElement(rLevel[i], i, boardSize));
      if (rLevel[i] === "o") {
        elements.push(createElement("p", i, boardSize));
      }
    }
  }
  return {
    boardSize,
    elements,
  }
}

const createElement = (elementChar: string, index: number, boardSize: number): Element => {
  let type: ElementType = "Void";
  switch (elementChar) {
    case 'x':
      type = "Wall";
      break;
    case 's':
      type = "Start";
      break;
    case 'e':
      type = "End";
      break;
    case 'b':
      type = "Box";
      break;
    case 'g':
      type = "GreenField";
      break;
    case 'r':
      type = "RedField";
      break
    case 'S':
      type = "AltStart";
      break;
    case 'E':
      type = "AltEnd";
      break;
    case 'o':
      type = "BlueBox";
      break;
    case "p":
      type = "BluePath";
      break;
    default:
      throw new Error(`Error in one of the levels: unknown element: ${elementChar}.`)
  }
  const posX = index % boardSize;
  const posY = Math.floor(index / boardSize);
  return {
    type,
    posX,
    posY,
  }
}

export const prepareLevels = (config: LevelConfig, customLevels: ReadableLevel[]) => {
  const readableLevels = loadLevelsByConfig(config, customLevels);
  return transformLevels(readableLevels);
}
