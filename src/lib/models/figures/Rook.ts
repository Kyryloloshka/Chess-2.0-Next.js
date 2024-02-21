import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames, FigurePrioritet } from "./Figure";
const blackLogo = "/assets/pieces/br.svg"
const whiteLogo = "/assets/pieces/wr.svg"

export class Rook extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.ROOK;
    this.prioritet = FigurePrioritet.ROOK
  }
}