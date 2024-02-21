import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
const blackLogo = "/assets/pieces/bk.svg"
const whiteLogo = "/assets/pieces/wk.svg"

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const x = Math.abs(target.x - this.cell.x);
    const y = Math.abs(target.y - this.cell.y)
    return x <= 1 && x >= -1 && y <= 1 && y >= -1;
  }
}