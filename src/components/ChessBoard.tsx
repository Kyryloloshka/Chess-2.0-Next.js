
import { Board } from '@/lib/models/Board';
import { Player } from '@/lib/models/Player';
import React, { useEffect, useState } from 'react';
import CellComponent from './CellComponent';
import { Cell } from '@/lib/models/Cell';
import PawnPromotionModal from './PawnPromotionModal';
import { FigureNames } from '@/lib/models/figures/Figure';
import { Colors } from '@/lib/models/Colors';

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
	const [isMate, setIsMate] = useState<boolean>(false);
	const [isPat, setIsPat] = useState<boolean>(false);
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
		if (board.isMate(currentPlayer.color === Colors.BLACK ? Colors.WHITE : Colors.BLACK)) {
			setIsMate(true);
		} else if (board.isPat(currentPlayer.color === Colors.BLACK ? Colors.WHITE : Colors.BLACK)) {
			setIsPat(true);
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
			{<div className={`h-full w-full absolute left-0 top-0 text-3xl transition-all text-light-2 font-semibold pointer-events-none tracking-wider ${isMate && "bg-[#00000080]"} z-20 flex-center`}>
				<span className={`opacity-0 ${isMate && "opacity-100"} transition-all`}>{currentPlayer.color === Colors.WHITE ? "Black win" : "White win"}</span>
			</div>}
			{<div className={`h-full w-full absolute left-0 top-0 text-3xl transition-all text-light-2 font-semibold pointer-events-none tracking-wider ${isPat && "bg-[#00000080]"} z-20 flex-center`}>
				<span className={`opacity-0 ${isPat && "opacity-100"} transition-all`}>Draw</span>
			</div>}
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