import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames, FigurePrioritet } from "./Figure";
const whiteLogo = "/assets/pieces/wb.svg"
const blackLogo = "/assets/pieces/bb.svg"

export class Bishop extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.BISHOP;
    this.prioritet = FigurePrioritet.BISHOP;
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
    if (this.cell.isEmptyDiagonal(target)) {
      return true;
    }
    
    return false
  }

  moveFigure(target: Cell): void {
    super.moveFigure(target);
  }
}