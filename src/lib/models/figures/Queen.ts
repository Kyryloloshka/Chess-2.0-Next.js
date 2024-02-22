import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames, FigurePrioritet } from "./Figure";
const blackLogo = "/assets/pieces/bq.svg"
const whiteLogo = "/assets/pieces/wq.svg"

export class Queen extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.QUEEN;
    this.prioritet = FigurePrioritet.QUEEN
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (this.cell.isEmptyHorizontal(target) 
      || this.cell.isEmptyVertical(target) 
      || this.cell.isEmptyDiagonal(target)) {
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
    return false;
  }
  canThreaten(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (this.cell.isEmptyHorizontal(target) 
      || this.cell.isEmptyVertical(target) 
      || this.cell.isEmptyDiagonal(target)) {
      return true;
    }
    return false;
  }
}