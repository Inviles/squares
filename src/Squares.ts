/* eslint-disable unicorn/no-new-array */
import { Graph } from './Graph';

type Player = 1 | 2;
type SquareItem = Player | null;
type Row = SquareItem[];
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
      // const updatedRow = [...this.field[rowIndex]];
      // updatedRow[columnIndex] = this.currentPlayer;
      // const updateField = [...this.field];
      // updateField[rowIndex] = updatedRow;
      // this.field = updateField;

      const updatedField = [...this.field];
      updatedField[rowIndex][columnIndex] = this.currentPlayer;
      this.field = updatedField;
    };

    const getClosestSquaresIndexes = () => {
      const leftSquareInfo = { row: rowIndex, column: columnIndex - 1 };
      const topSquareInfo = { row: rowIndex - 1, column: columnIndex };
      const rightSquareInfo = { row: rowIndex, column: columnIndex + 1 };
      const bottomSquareInfo = { row: rowIndex + 1, column: columnIndex };

      console.log('sss', [leftSquareInfo, topSquareInfo, rightSquareInfo, bottomSquareInfo]);

      return [leftSquareInfo, topSquareInfo, rightSquareInfo, bottomSquareInfo];
    };

    const makeConnectionsBetweenSiblingSquares = () => {
      const closesSquaresIndexes = getClosestSquaresIndexes();

      closesSquaresIndexes.forEach(({ column, row }) => {
        console.log(column, row);

        const square = this.field[row]?.[column];

        console.log('square', square);

        if (square === this.currentPlayer) {
          const siblingVertexIndex = column + row * fieldSize;

          console.log('siblingVertexIndex', siblingVertexIndex);
          console.log('vertexIndex', vertexIndex);

          targetGraph.addEdge(vertexIndex, siblingVertexIndex);
        }
      });
    };

    updateGraph();
    selectSquare();
    makeConnectionsBetweenSiblingSquares();
    this.switchPlayer();

    console.log(this.firstPlayerGraph);

    return this.field;
  }
}

export { Squares };
