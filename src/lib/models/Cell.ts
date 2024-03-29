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
	isEmptyDiagonal(target: Cell): boolean {
		const x = Math.abs(target.x - this.x);
		const y = Math.abs(target.y - this.y)
		if (x != y) return false;
		const dy = this.y < target.y ? 1 : -1;
		const dx = this.x < target.x ? 1 : -1;
		for (let i = 1; i < y; i++) {
			if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) return false;
		}
		return true;
	}
	isEmptyHorizontal(target: Cell): boolean {
		if (this.y !== target.y) {
			return false;
		}
		const min = Math.min(target.x, this.x);
		const max = Math.max(target.x, this.x);
		for (let i = min + 1; i < max; i++) {
			if (!this.board.getCell(i, this.y).isEmpty()) return false;
		}
		return true
	}
	isEmptyVertical(target: Cell): boolean {
		if (this.x !== target.x) {
			return false;
		}
		const min = Math.min(target.y, this.y);
		const max = Math.max(target.y, this.y);
		for (let i = min + 1; i < max; i++) {
			if (!this.board.getCell(this.x, i).isEmpty()) return false;
		}
		return true
	}
	removeFigure() {
		this.figure = null;
	}

	equals(other: Cell): boolean {
    return this.x === other.x && this.y === other.y;
  }

	setFigure(figure: Figure) {
		this.figure = figure;
		this.figure.cell = this
	}
	moveFigure(target: Cell) {
		if (this.figure && this.figure?.canMove(target)) {
			this.board.setAllPownsFirstStepToFalse(this.figure.color, this);
			this.figure.moveFigure(target)
			target.setFigure(this.figure)
			this.figure = null;
		}
	}
}