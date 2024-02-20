
import { Board } from '@/lib/models/Board';
import { Player } from '@/lib/models/Player';
import React from 'react';
import CellComponent from './CellComponent';

interface ChessBoardProps {
  board: Board;
  setBoard: Function;
  currentPlayer: Player;
}

const ChessBoard = ({board, setBoard, currentPlayer}: ChessBoardProps) => {
  return (
    <div className="">
      <div className="board">
				{board.cells.map((row, index) =>
					<React.Fragment key={index}>
						{row.map(cell =>
							<CellComponent
								cell={cell}
								key={cell.id}
							/>
						)}
					</React.Fragment>
				)}
			</div>
    </div>
  )
};

export default ChessBoard;