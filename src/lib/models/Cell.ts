import { Board } from "./Board";
import { Colors } from "./Colors";

export class Cell {
  readonly x: number;
	readonly y: number;
	readonly color: Colors;
	board: Board;
	available: boolean;
	id: number;

	constructor(board: Board, x: number, y: number, color: Colors) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.board = board;
		this.available = false;
		this.id = Math.random()
	}
}