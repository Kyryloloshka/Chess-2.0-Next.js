import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export class Board {
  cells: Cell[][] = [];
  public initCells() {
		for (let i = 0; i < 8; i++) {
			const row: Cell[] = []
			for (let j = 0; j < 8; j++) {
				if ((i + j) % 2 !== 0) {
					row.push(new Cell(this, j, i, Colors.BLACK, null))
				} else {
					row.push(new Cell(this, j, i, Colors.WHITE, null))
				}
			}
			this.cells.push(row)
		}
	}
	public isCheck(color: Colors): boolean {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const cell = this.getCell(i, j);
				if (cell.figure?.color === color && cell.figure instanceof King) {
					if (cell.figure.isCheck()) {
						return true;
					}
				}
			}
		}
		return false;
	}
	public isMate(color: Colors): boolean {
		return this.isCheck(color) && this.isPat(color)
	}
	public isPat(color: Colors):boolean {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const cell = this.getCell(i, j);
				for (let k = 0; k < 8; k++) {
					for (let l = 0; l < 8; l++) {
						const cellMove = this.getCell(k, l);
						if (cell.figure?.color === color && cell.figure.canMove(cellMove)) {
							return false;
						}
					}
				}
			}
		}
		return true
	}
	public setAllPownsFirstStepToFalse(color: Colors, cellFigure: Cell) {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const cell = this.getCell(i, j)
				if (cell.figure instanceof Pawn && cell.figure.color === color && !cell.equals(cellFigure)) {
					cell.figure.isPreviousStepFirst = false;
				}
			}
		}
	}
	public checkIsCellUnderAttack(notColor: Colors, checkCell: Cell) {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const cell = this.getCell(i, j)
				if (cell.figure && cell.figure.color !== notColor && cell.figure.canThreaten(checkCell)) {
					return true
				}
			}
		}
		return false
	}


	public removeFigure(x: number, y: number) {
		const cell = this.getCell(x, y);
		if (cell) {
			cell.removeFigure();
		}
	}

	public getCopyBoard() {
		const newBoard = new Board()
		newBoard.cells = this.cells;
		return newBoard;
	}

	public highlightCells(selectedCell: Cell | null) {
		for (let i = 0; i < this.cells.length; i++ ) {
			const row = this.cells[i];
			for (let j = 0; j < row.length; j++) {
				const target = row[j];
				target.available = !!selectedCell?.figure?.canMove(target)
			}
		}
	}

	public getCell(x: number, y: number) {
		return this.cells[y][x]
	}
	private addPawns() {
		for (let i = 0; i < 8; i++) {
			new Pawn(Colors.BLACK, this.getCell(i, 1))
			new Pawn(Colors.WHITE, this.getCell(i, 6))
		}
	}
	private addKings() {
		new King(Colors.WHITE, this.getCell(4, 7))
		new King(Colors.BLACK, this.getCell(4, 0))
	}
	private addBishops() {
		new Bishop(Colors.WHITE, this.getCell(2, 7))
		new Bishop(Colors.BLACK, this.getCell(2, 0))
		new Bishop(Colors.WHITE, this.getCell(5, 7))
		new Bishop(Colors.BLACK, this.getCell(5, 0))
	}
	private addKnights() {
		new Knight(Colors.WHITE, this.getCell(1, 7))
		new Knight(Colors.BLACK, this.getCell(1, 0))
		new Knight(Colors.WHITE, this.getCell(6, 7))
		new Knight(Colors.BLACK, this.getCell(6, 0))
	}
	private addQueens() {
		new Queen(Colors.WHITE, this.getCell(3, 7))
		new Queen(Colors.BLACK, this.getCell(3, 0))
	}
	private addRooks() {
		new Rook(Colors.WHITE, this.getCell(0, 7))
		new Rook(Colors.BLACK, this.getCell(0, 0))
		new Rook(Colors.WHITE, this.getCell(7, 7))
		new Rook(Colors.BLACK, this.getCell(7, 0))
	}
	public addFigures() {
		this.addQueens()
		this.addRooks()
		this.addKnights()
		this.addBishops()
		this.addPawns()
		this.addKings()
	}
}