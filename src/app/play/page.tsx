"use client"
import ChessBoard from "@/components/ChessBoard";
import { Board } from "@/lib/models/Board";
import { Colors } from "@/lib/models/Colors";
import { Player } from "@/lib/models/Player";
import { useEffect, useState } from "react";

export default function Play() {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer] = useState<Player>(new Player(Colors.WHITE))
	const [blackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player>(whitePlayer)

  function restart() {
		setCurrentPlayer(whitePlayer)
		const newBoard = new Board();
		newBoard.initCells()
		setBoard(newBoard)
	}

  useEffect(() => {
		restart()
	}, [])
  return (
    <div className="min-h-[100vh] flex justify-center items-center gap-10 flex-wrap">
      <ChessBoard
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
      />
    </div>
  );
}
