import { Figure, FigureNames } from '@/lib/models/figures/Figure';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { PrimaryButton } from './PrimaryButton';
import { Cell } from '@/lib/models/Cell';
import { Queen } from '@/lib/models/figures/Queen';
import { Bishop } from '@/lib/models/figures/Bishop';
import { Knight } from '@/lib/models/figures/Knight';
import { Rook } from '@/lib/models/figures/Rook';
import { Colors } from '@/lib/models/Colors';

interface PawnPromotionModalProps {
  isOpen: boolean;
  onClose: Function;
  cell: Cell | null;
}

const PawnPromotionModal = ({ isOpen, onClose, cell }: PawnPromotionModalProps) => {

  const handleConfirm = (selectedFigure: FigureNames | null) => {
    onClose();

    if (cell?.figure) {
      switch (selectedFigure) {
        case FigureNames.BISHOP:
          cell.setFigure(new Bishop(cell.figure.color, cell))
          break;
        case FigureNames.KNIGHT:
          cell.setFigure(new Knight(cell.figure.color, cell))
          break;
        case FigureNames.QUEEN:
          cell.setFigure(new Queen(cell.figure.color, cell))
          break;
        case FigureNames.ROOK:
          cell.setFigure(new Rook(cell.figure.color, cell))
          break;
                    
        default:
          break;
      }
    } else {
      console.error("Something went wrong");
    }
  };

  return (
      <Modal style={{ overlay: { background: "#00000070" } }} className={"h-full pb-36 flex flex-center p-5"} isOpen={isOpen} onRequestClose={() => onClose()} contentLabel="Pawn Promotion Modal">
        <div className="flex flex-col gap-6 bg-[--bg] p-[calc(2%+6px)] rounded-xl ">
          <h2 className='text-light-2 text-3xl text-center tracking-wider'>Choose a figure to transform a paw</h2>
          <div className='flex gap-6 flex-wrap justify-center'>
            <button onClick={() => handleConfirm(FigureNames.QUEEN)}>
              <img className='w-[25vw] max-w-[120px]' src={cell?.figure?.color ===Colors.BLACK ? "/assets/pieces/bq.svg" : "/assets/pieces/wq.svg"} alt="" />
            </button>
            <button onClick={() => handleConfirm(FigureNames.ROOK)}>
              <img className='w-[25vw] max-w-[120px]' src={cell?.figure?.color ===Colors.BLACK ? "/assets/pieces/br.svg" : "/assets/pieces/wr.svg"} alt="" />
            </button>
            <button onClick={() => handleConfirm(FigureNames.BISHOP)}>
              <img className='w-[25vw] max-w-[120px]' src={cell?.figure?.color ===Colors.BLACK ? "/assets/pieces/bb.svg" : "/assets/pieces/wb.svg"} alt="" />
            </button>
            <button onClick={() => handleConfirm(FigureNames.KNIGHT)}>
              <img className='w-[25vw] max-w-[120px]' src={cell?.figure?.color ===Colors.BLACK ? "/assets/pieces/bh.svg" : "/assets/pieces/wh.svg"} alt="" />
            </button>
          </div>
        </div>
      </Modal>
  );
};

export default PawnPromotionModal;
