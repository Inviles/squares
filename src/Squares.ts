/* eslint-disable unicorn/no-new-array */
import { Graph } from './Graph';

type Player = 1 | 2 | null;
export type Square = Player;
export type Row = Square[];
export type Field = Row[];

class Squares {
  field: Field = [];

  firstPlayerGraph = new Graph();

  secondPlayerGraph = new Graph();

  currentPlayer: Player = null;

  remainingNumberOfMoves = 0;

  start = (fieldSize = 3): Field => {
    this.firstPlayerGraph = new Graph();
    this.secondPlayerGraph = new Graph();
    this.currentPlayer = 1;
    this.remainingNumberOfMoves = fieldSize * fieldSize;

    const arrayFilledWithNulls = (): null[] => new Array(fieldSize).fill(null);
    const rows = arrayFilledWithNulls();

    this.field = rows.map(() => arrayFilledWithNulls());

    return this.field;
  }

  switchPlayer = (): void => {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }

  makeMove = (rowIndex: number, columnIndex: number): Field => {
    if (this.currentPlayer === null) {
      throw new Error('The game hasn`\t started yet');
    }

    if (this.remainingNumberOfMoves === 0) {
      throw new Error('There aren\'t any moves left');
    }

    const targetGraph = this.currentPlayer === 1 ? this.firstPlayerGraph : this.secondPlayerGraph;
    const fieldSize = this.field.length;
    const vertexIndex = columnIndex + rowIndex * fieldSize;

    const updateGraph = () => targetGraph.addVertex(vertexIndex);

    const selectSquare = () => {
      const updatedField = [...this.field];

      updatedField[rowIndex][columnIndex] = this.currentPlayer;
      this.field = updatedField;
    };

    const getClosestSquaresInfo = () => {
      const leftSquareInfo = { row: rowIndex, column: columnIndex - 1 };
      const topSquareInfo = { row: rowIndex - 1, column: columnIndex };
      const rightSquareInfo = { row: rowIndex, column: columnIndex + 1 };
      const bottomSquareInfo = { row: rowIndex + 1, column: columnIndex };

      return [leftSquareInfo, topSquareInfo, rightSquareInfo, bottomSquareInfo];
    };

    const makeConnectionsBetweenSiblingSquares = () => {
      const closestSquaresInfo = getClosestSquaresInfo();

      closestSquaresInfo.forEach(({ column, row }) => {
        const square = this.field[row]?.[column];

        if (square === this.currentPlayer) {
          const siblingVertexIndex = column + row * fieldSize;

          targetGraph.addEdge(vertexIndex, siblingVertexIndex);
        }
      });
    };

    updateGraph();
    selectSquare();
    makeConnectionsBetweenSiblingSquares();

    this.remainingNumberOfMoves -= 1;
    this.switchPlayer();

    return this.field;
  }

  finish = (): Player => {
    const firstPlayerPathLength = this.firstPlayerGraph.findLongestPath();
    const secondPlayerPathLength = this.secondPlayerGraph.findLongestPath();

    if (firstPlayerPathLength === secondPlayerPathLength) {
      return null;
    }

    return firstPlayerPathLength > secondPlayerPathLength ? 1 : 2;
  }
}

export { Squares };
