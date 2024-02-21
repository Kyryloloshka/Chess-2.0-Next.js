import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames, FigurePrioritet } from "./Figure";
import blackLogo from "@/../public/assets/pieces/bh.svg"
import whiteLogo from "@/../public/assets/pieces/wh.svg"

export class Knight extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KNIGHT;
    this.prioritet = FigurePrioritet.KNIGHT
  }
}