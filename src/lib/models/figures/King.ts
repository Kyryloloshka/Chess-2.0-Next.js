import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import { Rook } from "./Rook";
const blackLogo = "/assets/pieces/bk.svg"
const whiteLogo = "/assets/pieces/wk.svg"

export class King extends Figure {
  public isMoved = false;
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
    if ( x <= 1 && x >= -1 && y <= 1 && y >= -1) {
      return true
    }
    const leftRook = target.board.getCell(0, this.cell.y);
    const rightRook = target.board.getCell(7, this.cell.y);
    return target.y === this.cell.y
      && !this.isMoved
      && !this.isCheck()
      && (target.x === 2 
      && target.board.getCell(this.cell.x - 1, this.cell.y).isEmpty()
      && target.board.getCell(this.cell.x - 2, this.cell.y).isEmpty()
      && target.board.getCell(this.cell.x - 3, this.cell.y).isEmpty()
      && !this.cell.board.checkIsCellUnderAttack(this.color, this.cell.board.getCell(this.cell.x - 1, this.cell.y))
      && !this.cell.board.checkIsCellUnderAttack(this.color, this.cell.board.getCell(this.cell.x - 2, this.cell.y))
      && !this.cell.board.checkIsCellUnderAttack(this.color, this.cell.board.getCell(this.cell.x - 4, this.cell.y))
      && leftRook.figure instanceof Rook
      && !leftRook.figure.isMoved
      || target.x === 6
      && this.cell.board.getCell(this.cell.x + 1, this.cell.y).isEmpty()
      && this.cell.board.getCell(this.cell.x + 2, this.cell.y).isEmpty()
      && !this.cell.board.checkIsCellUnderAttack(this.color, this.cell.board.getCell(this.cell.x + 1, this.cell.y))
      && !this.cell.board.checkIsCellUnderAttack(this.color, this.cell.board.getCell(this.cell.x + 2, this.cell.y))
      && !this.cell.board.checkIsCellUnderAttack(this.color, this.cell.board.getCell(this.cell.x + 3, this.cell.y))
      && rightRook.figure instanceof Rook
      && !rightRook.figure.isMoved)
  }
  isCheck() {
    return this.cell.board.checkIsCellUnderAttack(this.color, this.cell);
  }
  moveFigure(target: Cell): void {
    const leftRook = target.board.getCell(0, this.cell.y);
    const leftRookPlace = target.board.getCell(3, this.cell.y)
    if (!this.isMoved && target.x === 2 && leftRook.figure instanceof Rook) {
      leftRook.moveFigure(leftRookPlace)
    }
    const rightRook = target.board.getCell(7, this.cell.y)
    const rightRookPlace = target.board.getCell(5, this.cell.y)
    if (!this.isMoved && target.x === 6 && rightRook.figure instanceof Rook) {
      rightRook.moveFigure(rightRookPlace)
    }
    this.isMoved = true;
  }
}