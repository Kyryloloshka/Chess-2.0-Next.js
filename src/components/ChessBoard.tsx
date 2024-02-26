
import { Board } from '@/lib/models/Board';
import { Player } from '@/lib/models/Player';
import React, { useEffect, useState } from 'react';
import CellComponent from './CellComponent';
import { Cell } from '@/lib/models/Cell';
import PawnPromotionModal from './PawnPromotionModal';
import { Figure, FigureNames } from '@/lib/models/figures/Figure';
import { Colors } from '@/lib/models/Colors';
import { transformCoordinates } from '@/lib/utils';

interface ChessBoardProps {
  board: Board;
  setBoard: Function;
  currentPlayer: Player;
	swapPlayers: Function;
	setMovesList: Function;
}

const ChessBoard = ({board, setBoard, currentPlayer, swapPlayers, setMovesList}: ChessBoardProps) => {
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

	const click = (cell: Cell) => {
		if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
			selectedCell.moveFigure(cell);
			swapPlayers()
			setSelectedCell(null!)
			updateBoard()
			if (board.isMate(currentPlayer.color === Colors.BLACK ? Colors.WHITE : Colors.BLACK)) {
				setIsMate(true);
			} else if (board.isPat(currentPlayer.color === Colors.BLACK ? Colors.WHITE : Colors.BLACK)) {
				setIsPat(true);
			}
			if (cell.figure?.name === FigureNames.PAWN && (cell.y === 7 || cell.y === 0)) {
				openPawnPromotionModal(cell)
			}
			setMovesList((prevHistory: Array<{figure: Figure | null; from: Cell; to: Cell }>) => [
        ...prevHistory,
        { figure: cell.figure, from: selectedCell, to: cell },
      ]);
		} else {
			if (cell.figure?.color === currentPlayer?.color) {
				setSelectedCell(cell)
			}
		}
	}

	useEffect(() => {
		highlightCells()
	}, [selectedCell])

	const highlightCells = () => {
		board.highlightCells(selectedCell)
		updateBoard()
	}

	const updateBoard = () => {
		const newBoard = board.getCopyBoard()
		setBoard(newBoard)
	}
  return (
    <div className="min-w-[250px] flex-auto flex-center">
			<div className="relative flex-auto">
				{<div className={`h-full w-full absolute left-0 top-0 text-3xl transition-all text-light-2 font-semibold pointer-events-none tracking-wider ${isMate && "bg-[#00000080]"} z-20 flex-center`}>
					<span className={`opacity-0 ${isMate && "opacity-100"} transition-all`}>{currentPlayer.color === Colors.WHITE ? "Black win" : "White win"}</span>
				</div>}
				{<div className={`h-full w-full absolute left-0 top-0 text-3xl transition-all text-light-2 font-semibold pointer-events-none tracking-wider ${isPat && "bg-[#00000080]"} z-20 flex-center`}>
					<span className={`opacity-0 ${isPat && "opacity-100"} transition-all`}>Draw</span>
				</div>}
				<div className="grid grid-rows-8 grid-cols-8 min-w-[200px] aspect-square select-none">
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