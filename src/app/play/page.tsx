"use client"
import ChessBoard from "@/components/ChessBoard";
import { Board } from "@/lib/models/Board";
import { Colors } from "@/lib/models/Colors";
import { Player } from "@/lib/models/Player";
import { useEffect, useState } from "react";

export default function Play() {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer] = useState<Player>(new Player(Colors.WHITE))
	const [blackPlayer] = useState<Player>(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player>(whitePlayer)
  function swapPlayers() {
		setCurrentPlayer(prev => prev === whitePlayer ? blackPlayer : whitePlayer);
	}
  function restart() {
		setCurrentPlayer(whitePlayer)
		const newBoard = new Board();
		newBoard.initCells()
    newBoard.addFigures()
		setBoard(newBoard)
	}

  useEffect(() => {
		restart()
	}, [])
  return (
    <div className="min-h-[100vh] flex justify-center items-center gap-10 flex-wrap">
      <div className="flex-center flex-auto relative max-h-[70vh] max-w-[70vw]">
        <ChessBoard
          board={board}
          setBoard={setBoard}
          swapPlayers={swapPlayers}
          currentPlayer={currentPlayer}
        />
      </div>
    </div>
  );
}
