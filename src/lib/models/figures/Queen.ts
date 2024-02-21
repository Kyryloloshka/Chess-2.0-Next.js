import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames, FigurePrioritet } from "./Figure";
import blackLogo from "@/../public/assets/pieces/bq.svg"
import whiteLogo from "@/../public/assets/pieces/wq.svg"

export class Queen extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.QUEEN;
    this.prioritet = FigurePrioritet.QUEEN
  }
}