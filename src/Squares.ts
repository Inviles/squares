/* eslint-disable unicorn/no-new-array */
import { Graph } from './Graph';

export type Player = 1 | 2;
export type Square = Player | null;
export type Row = Square[];
type Field = Row[];

class Squares {
  field: Field = [];

  firstPlayerGraph = new Graph();

  secondPlayerGraph = new Graph();

  currentPlayer: Player = 1;

  start = (fieldSize = 3): Field => {
    console.log('[DEBUG] ===> start game');

    const arrayFilledWithNulls = (): null[] => new Array(fieldSize).fill(null);
    const rows = arrayFilledWithNulls();

    this.field = rows.map(() => arrayFilledWithNulls());

    return this.field;
  }

  switchPlayer = (): void => {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }

  makeMove = (rowIndex: number, columnIndex: number): Field => {
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
    this.switchPlayer();

    return this.field;
  }

  finish = (): Player => {
    const firstPlayerPathLength = this.firstPlayerGraph.findLongestPath();
    const secondPlayerPathLength = this.secondPlayerGraph.findLongestPath();

    const winner = firstPlayerPathLength > secondPlayerPathLength
      ? 1
      : 2;

    return winner;
  }
}

export { Squares };
