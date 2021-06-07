/* eslint-disable unicorn/no-new-array */
import { Graph } from './Graph';

export type Player = 1 | 2 | null;
export type Square = Player;
export type Row = Square[];
export type Field = Row[];
export type Statistics = Record<Exclude<Player, null>, number>;
export type MakeMove = (rowIndex: number, columnIndex: number) => Field;

const GAME_HAS_NOT_STARTED = 'The game has not started yet';
const DEFAULT_STATISTICS = { 1: 0, 2: 0 };

class Squares {
  field: Field = [];

  private firstPlayerGraph: Graph | null = null;

  private secondPlayerGraph: Graph | null = null;

  private currentPlayerGraph: Graph | null = null;

  currentPlayer: Player = null;

  remainingNumberOfMoves = 0;

  statistics: Statistics = DEFAULT_STATISTICS;

  start = (fieldSize = 3): Field => {
    this.firstPlayerGraph = new Graph();
    this.secondPlayerGraph = new Graph();
    this.currentPlayer = 1;
    this.currentPlayerGraph = this.firstPlayerGraph;
    this.remainingNumberOfMoves = fieldSize * fieldSize;
    this.statistics = DEFAULT_STATISTICS;

    const createArrayFilledWithNulls = (): null[] => new Array(fieldSize).fill(null);
    const rows = createArrayFilledWithNulls();

    this.field = rows.map(() => createArrayFilledWithNulls());

    return this.field;
  }

  makeMove: MakeMove = (rowIndex, columnIndex) => {
    if (this.currentPlayer === null) {
      throw new Error(GAME_HAS_NOT_STARTED);
    }

    if (this.remainingNumberOfMoves === 0) {
      throw new Error('There are not any moves left');
    }

    this.selectSquare(rowIndex, columnIndex);
    this.updateCurrentGraph(rowIndex, columnIndex);

    const numberOfwinningSquares = this.currentPlayerGraph?.findLongestPath();
    const updatedStatistics = { ...this.statistics, [this.currentPlayer]: numberOfwinningSquares };

    this.statistics = updatedStatistics;
    this.remainingNumberOfMoves -= 1;
    this.switchPlayer();

    return this.field;
  }

  finish = (): Player => {
    if (this.firstPlayerGraph === null || this.secondPlayerGraph === null) {
      throw new Error(GAME_HAS_NOT_STARTED);
    }

    const firstPlayerWinningSquares = this.statistics[1];
    const secondPlayerWinningSquares = this.statistics[2];

    if (firstPlayerWinningSquares === secondPlayerWinningSquares) {
      return null;
    }

    return firstPlayerWinningSquares > secondPlayerWinningSquares ? 1 : 2;
  }

  private selectSquare = (rowIndex: number, columnIndex: number) => {
    const updatedField = [...this.field];

    updatedField[rowIndex][columnIndex] = this.currentPlayer;
    this.field = updatedField;
  };

  private updateCurrentGraph = (rowIndex: number, columnIndex: number) => {
    if (this.currentPlayerGraph === null) {
      throw new Error(GAME_HAS_NOT_STARTED);
    }

    const vertexIndex = this.getVertexIndex(rowIndex, columnIndex);

    this.currentPlayerGraph.addVertex(vertexIndex);
    this.makeConnectionsBetweenSiblingSquares(rowIndex, columnIndex);
  }

  private getVertexIndex = (rowIndex: number, columnIndex: number) => {
    const fieldSize = this.field.length;

    return columnIndex + rowIndex * fieldSize;
  }

  private makeConnectionsBetweenSiblingSquares = (rowIndex: number, columnIndex: number) => {
    if (this.currentPlayerGraph === null) {
      throw new Error(GAME_HAS_NOT_STARTED);
    }

    const vertexIndex = this.getVertexIndex(rowIndex, columnIndex);
    const closestSquaresInfo = this.getClosestSquaresInfo(rowIndex, columnIndex);

    closestSquaresInfo.forEach(({ column, row }) => {
      const square = this.field[row]?.[column];

      if (square === this.currentPlayer) {
        const fieldSize = this.field.length;
        const siblingVertexIndex = column + row * fieldSize;

        this.currentPlayerGraph!.addEdge(vertexIndex, siblingVertexIndex);
      }
    });
  };

  private getClosestSquaresInfo = (rowIndex: number, columnIndex: number) => {
    const leftSquareInfo = { row: rowIndex, column: columnIndex - 1 };
    const topSquareInfo = { row: rowIndex - 1, column: columnIndex };
    const rightSquareInfo = { row: rowIndex, column: columnIndex + 1 };
    const bottomSquareInfo = { row: rowIndex + 1, column: columnIndex };

    return [leftSquareInfo, topSquareInfo, rightSquareInfo, bottomSquareInfo];
  };

  private switchPlayer = (): void => {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    this.currentPlayerGraph = this.currentPlayer === 1 ? this.firstPlayerGraph : this.secondPlayerGraph;
  }
}

export { Squares };
