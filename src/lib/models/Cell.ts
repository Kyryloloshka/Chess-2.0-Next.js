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
}