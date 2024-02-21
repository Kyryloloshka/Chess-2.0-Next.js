import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames, FigurePrioritet } from "./Figure";
import whiteLogo from "@/../public/assets/pieces/wb.svg"
import blackLogo from "@/../public/assets/pieces/bb.svg"

export class Bishop extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.BISHOP;
    this.prioritet = FigurePrioritet.BISHOP;
  }
}