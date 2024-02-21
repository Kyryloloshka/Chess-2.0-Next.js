import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames, FigurePrioritet } from "./Figure";
const blackLogo = "/assets/pieces/bh.svg"
const whiteLogo = "/assets/pieces/wh.svg"

export class Knight extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KNIGHT;
    this.prioritet = FigurePrioritet.KNIGHT
  }
  canMove(target: Cell): boolean {
      if (!super.canMove(target)) {
        return false;
      }
      const x = Math.abs(this.cell.x - target.x)
      const y = Math.abs(this.cell.y - target.y)
      return (x == 1 && y == 2) || (x == 2 && y == 1)
  }
}