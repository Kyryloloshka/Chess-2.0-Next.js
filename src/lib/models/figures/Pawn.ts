import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames, FigurePrioritet } from "./Figure";
const blackLogo = "/assets/pieces/bp.svg"
const whiteLogo = "/assets/pieces/wp.svg"
export class Pawn extends Figure {
  isFirstStep: boolean = true
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
    this.prioritet = FigurePrioritet.PAWN
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false
    }
    const directionY = this.cell.figure?.color === Colors.BLACK ? 1 : -1
    const firstStepDirectionY = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    if ((target.y === this.cell.y + directionY || (this.isFirstStep
			&& (target.y === this.cell.y + firstStepDirectionY)))
			&& target.x === this.cell.x
			&& this.cell.board.getCell(target.x, target.y).isEmpty()) {
			return true;
		}

    if (target.y === this.cell.y + directionY
			&& (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
			&& this.cell.isEnemy(target)) {

			return true;
		}
    
    return false
  }
  moveFigure(target: Cell): void {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}