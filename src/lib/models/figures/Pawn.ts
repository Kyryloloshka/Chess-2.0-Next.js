import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames, FigurePrioritet } from "./Figure";
import blackLogo from "@/../public/assets/pieces/bp.svg"
import whiteLogo from "@/../public/assets/pieces/wp.svg"
export class Pawn extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
    this.prioritet = FigurePrioritet.PAWN
  }
}