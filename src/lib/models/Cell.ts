import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class Cell {
  readonly x: number;
	readonly y: number;
	readonly color: Colors;
	board: Board;
	available: boolean;
	id: number;
	figure: Figure | null;

	constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.board = board;
		this.available = false;
		this.id = Math.random();
		this.figure = figure;
	}
	isEmpty(): boolean {
		return this.figure === null;
	}

	isEnemy(target: Cell): boolean {
		if (target.figure) {
			return this.figure?.color !== target.figure.color;
		}
		return false
	}

	setFigure(figure: Figure) {
		this.figure = figure;
		this.figure.cell = this
	}
	moveFigure(target: Cell) {
		if (this.figure && this.figure?.canMove(target)) {
			this.figure.moveFigure(target)
			target.setFigure(this.figure)
			this.figure = null;
		}
	}
}