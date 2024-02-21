import { Cell } from "../Cell";
import { Colors } from "../Colors";

export enum FigureNames {
	"FIGURE",
	"KING",
	"KNIGHT",
	"PAWN",
	"QUEEN",
	"ROOK",
	"BISHOP",
}
export enum FigurePrioritet {
	"FIGURE" = 0,
	"PAWN" = 1,
	"KNIGHT" = 2,
	"BISHOP" = 3,
	"ROOK" = 4,
	"QUEEN" = 5,
}


export class Figure {
  color: Colors;
  logo: string | null;
  cell: Cell;
  name: FigureNames;
  id: number;
  prioritet: FigurePrioritet;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.prioritet = FigurePrioritet.FIGURE;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
    this.logo = null;
    this.cell.figure = this;
  }

}