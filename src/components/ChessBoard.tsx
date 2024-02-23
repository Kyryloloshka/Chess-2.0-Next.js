
import { Board } from '@/lib/models/Board';
import { Player } from '@/lib/models/Player';
import React, { useEffect, useState } from 'react';
import CellComponent from './CellComponent';
import { Cell } from '@/lib/models/Cell';
import { Colors } from '@/lib/models/Colors';
import { Figure, FigureNames } from '@/lib/models/figures/Figure';
import PawnPromotionModal from './PawnPromotionModal';
import { Queen } from '@/lib/models/figures/Queen';
import { Rook } from '@/lib/models/figures/Rook';
import { Bishop } from '@/lib/models/figures/Bishop';
import { Knight } from '@/lib/models/figures/Knight';

interface ChessBoardProps {
  board: Board;
  setBoard: Function;
  currentPlayer: Player;
	swapPlayers: Function;
}

const ChessBoard = ({board, setBoard, currentPlayer, swapPlayers}: ChessBoardProps) => {
	const [selectedCell, setSelectedCell] = useState<Cell>(null!)
	const [isPawnPromotionModalOpen, setPawnPromotionModalOpen] = useState(false);
	const [cellToUppendFigure, setCellToUppendFigure] = useState<Cell | null>(null);

	const openPawnPromotionModal = (cell: Cell) => {
		setPawnPromotionModalOpen(true);
		setCellToUppendFigure(cell)
	};

	const closePawnPromotionModal = () => {
		setPawnPromotionModalOpen(false);
	};

	function click(cell: Cell) {
		if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
			selectedCell.moveFigure(cell);
			swapPlayers()
			setSelectedCell(null!)
			updateBoard()
		} else {
			if (cell.figure?.color === currentPlayer?.color) {
				setSelectedCell(cell)
			}
		}
		if (cell.figure?.name === FigureNames.PAWN && (cell.y === 7 || cell.y === 0)) {
			openPawnPromotionModal(cell)
		}
	}
	useEffect(() => {
		highlightCells()
	}, [selectedCell])

	function highlightCells() {
		board.highlightCells(selectedCell)
		updateBoard()
	}

	function updateBoard() {
		const newBoard = board.getCopyBoard()
		setBoard(newBoard)
	}
  return (
    <div className="flex-auto justify-center items-center max-w-[80%]">
      <div className="grid grid-rows-8 grid-cols-8 min-w-[200px] max-h-[70vh] mx-auto aspect-square flex-auto select-none">
				{board.cells.map((row, index) =>
					<React.Fragment key={index}>
						{row.map(cell =>
							<CellComponent
							cell={cell}
							key={cell.id}
							selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
							click={click}
							/>
						)}
					</React.Fragment>
				)}
			</div>
			<PawnPromotionModal
				isOpen={isPawnPromotionModalOpen}
				onClose={closePawnPromotionModal}
				cell={cellToUppendFigure}
			/>
    </div>
  )
};

export default ChessBoard;