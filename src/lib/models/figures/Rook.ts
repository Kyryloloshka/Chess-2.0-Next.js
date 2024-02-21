import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames, FigurePrioritet } from "./Figure";
import blackLogo from "@/../public/assets/pieces/br.svg"
import whiteLogo from "@/../public/assets/pieces/wr.svg"

export class Rook extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.ROOK;
    this.prioritet = FigurePrioritet.ROOK
  }
}