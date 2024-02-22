import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames, FigurePrioritet } from "./Figure";
const blackLogo = "/assets/pieces/bp.svg"
const whiteLogo = "/assets/pieces/wp.svg"
export class Pawn extends Figure {
  isFirstStep: boolean = true
  isPreviousStepFirst: boolean = true

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
    this.prioritet = FigurePrioritet.PAWN
  }

  setIsPrevFirstStep(isPreviousStepFirst: boolean) {
    this.isPreviousStepFirst = isPreviousStepFirst
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
    const directionY = this.cell.figure?.color === Colors.BLACK ? 1 : -1
    const firstStepDirectionY = this.cell.figure?.color === Colors.BLACK ? 2 : -2;
    if ((target.y === this.cell.y + directionY || (this.isFirstStep
			&& (target.y === this.cell.y + firstStepDirectionY 
        && target.board.getCell(this.cell.x, this.cell.y + directionY).isEmpty())))
			&& target.x === this.cell.x
			&& this.cell.board.getCell(target.x, target.y).isEmpty()) {
			return true;
		}

    if (target.y === this.cell.y + directionY
			&& (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
			&& this.cell.isEnemy(target)) {
			return true;
		}
    const rightCell = this.cell.board.getCell(this.cell.x + 1, this.cell.y);
    const leftCell = this.cell.board.getCell(this.cell.x - 1, this.cell.y);
    
    if (target.y === this.cell.y + directionY
        && (target.x === this.cell.x + 1
        && rightCell.figure instanceof Pawn
        && rightCell.figure.isPreviousStepFirst
        && rightCell.figure.color !== this.color
        || target.x === this.cell.x - 1
        && leftCell.figure instanceof Pawn
        && leftCell.figure.isPreviousStepFirst
        && leftCell.figure.color !== this.color
        )
      ) {
      console.log(rightCell, leftCell);
      return true;
    }
    return false
  }

  moveFigure(target: Cell): void {
    const directionY = this.cell.figure?.color === Colors.BLACK ? 1 : -1
    const rightCell = this.cell.board.getCell(this.cell.x + 1, this.cell.y);
    const leftCell = this.cell.board.getCell(this.cell.x - 1, this.cell.y);
    if (target.y === this.cell.y + directionY
        && (target.x === this.cell.x + 1
        && rightCell.figure instanceof Pawn
        && rightCell.figure.isPreviousStepFirst
        && rightCell.figure.color !== this.color
        || target.x === this.cell.x - 1
        && leftCell.figure instanceof Pawn
        && leftCell.figure.isPreviousStepFirst
        && leftCell.figure.color !== this.color
        )
      ) {
      target.board.getCell(target.x, target.y - directionY).removeFigure();
    }
    if (!this.isFirstStep) {
      this.isPreviousStepFirst = false
    } else if (Math.abs(this.cell.y - target.y) === 2) {
      this.isPreviousStepFirst = true
    }
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}