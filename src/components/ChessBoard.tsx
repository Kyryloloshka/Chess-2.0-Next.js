
import { Board } from '@/lib/models/Board';
import { Player } from '@/lib/models/Player';
import React, { useEffect, useState } from 'react';
import CellComponent from './CellComponent';
import { Cell } from '@/lib/models/Cell';
import PawnPromotionModal from './PawnPromotionModal';
import { Figure, FigureNames } from '@/lib/models/figures/Figure';
import { Colors } from '@/lib/models/Colors';
import Modal from "react-modal"
import { PrimaryButton } from './PrimaryButton';

interface ChessBoardProps {
  board: Board;
  setBoard: Function;
  currentPlayer: Player;
	swapPlayers: Function;
	setMovesList: Function;
	restart: Function;
}

const ChessBoard = ({board, setBoard, currentPlayer, swapPlayers, setMovesList, restart}: ChessBoardProps) => {
	const [selectedCell, setSelectedCell] = useState<Cell>(null!)
	const [isPawnPromotionModalOpen, setPawnPromotionModalOpen] = useState(false);
	const [cellToUppendFigure, setCellToUppendFigure] = useState<Cell | null>(null);
	const [isPat, setIsPat] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');
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
			const curPlayerColor = currentPlayer.color === Colors.BLACK ? Colors.WHITE : Colors.BLACK
			if (board.isMate(curPlayerColor)) {
				openModal("Mate", curPlayerColor);
			} else if (board.isPat(curPlayerColor)) {
				setIsPat(true);
				openModal("Pat")
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

	const openModal = (caseEnd: string, curPlayerColor: Colors | null = null) => {
		if (caseEnd === "Mate" && curPlayerColor) {
			setModalText(curPlayerColor === Colors.WHITE ? "Black win" : "White win" );
		} else {
			setModalText("Draw");
		}
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="min-w-[250px] flex-auto flex-center">
			<div className="relative flex-auto">
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
			<Modal isOpen={isModalOpen}  style={{ overlay: { background: "#00000070" } }} className={"h-full pb-36 flex flex-center p-5"}>
				<div className={`opacity-0 ${isPat && "opacity-100"} transition-all flex flex-col gap-5 items-center`}>
					<span className='text-light-2 text-3xl font-semibold tracking-wider'>{modalText}</span>
          <PrimaryButton onClick={() => {
            restart()
						closeModal()
          }}>Restart</PrimaryButton>
        </div>
			</Modal>
    </div>
  )
};

export default ChessBoard;