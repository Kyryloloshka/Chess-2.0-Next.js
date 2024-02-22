import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames, FigurePrioritet } from "./Figure";
const blackLogo = "/assets/pieces/br.svg"
const whiteLogo = "/assets/pieces/wr.svg"

export class Rook extends Figure {
  public isMoved = false;
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.ROOK;
    this.prioritet = FigurePrioritet.ROOK
  }
  canMove(target: Cell): boolean {
    if (this.canThreaten(target)) {
      const originalCell = this.cell;
      const targetFigure = target.figure;
      
      this.cell.removeFigure();
      target.figure = this;
      this.cell = target;

      const kingUnderCheck = this.cell.board.isCheck(this.color);

      this.cell = originalCell;
      originalCell.figure = this;
      target.figure = targetFigure;

      return !kingUnderCheck;
    }
    return false
  }
  canThreaten(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false
    }
    if (this.cell.isEmptyHorizontal(target) || this.cell.isEmptyVertical(target)) {
      return true;
    }
    
    return false

  }
  moveFigure(target: Cell): void {
    this.isMoved = true;
  }
}