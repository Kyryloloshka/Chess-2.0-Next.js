"use client"
import ChessBoard from "@/components/ChessBoard";
import { Board } from "@/lib/models/Board";
import { Cell } from "@/lib/models/Cell";
import { Colors } from "@/lib/models/Colors";
import { Player } from "@/lib/models/Player";
import { Figure } from "@/lib/models/figures/Figure";
import { transformCoordinates } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Play() {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer] = useState<Player>(new Player(Colors.WHITE))
	const [blackPlayer] = useState<Player>(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player>(whitePlayer)
  const [movesList, setMovesList] = useState<Array<{figure: Figure | null; from: Cell; to: Cell }>>([]);
  function swapPlayers() {
		setCurrentPlayer(prev => prev === whitePlayer ? blackPlayer : whitePlayer);
	}
  function restart() {
		setCurrentPlayer(whitePlayer)
		const newBoard = new Board();
		newBoard.initCells()
    newBoard.addFigures()
		setBoard(newBoard)
    setMovesList([])
	}

  useEffect(() => {
		restart()
	}, [])

  return (
    <div className="p-5 gap-5 flex flex-col min-h-[80vh] sm:min-h-[400px] sm:flex-row justify-center">
      <div className="flex-center sm:flex-auto rounded-[10px] w-[100%] sm:w-auto  relative sm:max-w-[calc(100dvh-2.5rem)] sm:max-h-[calc(100dvh-2.5rem)] overflow-hidden  self-start">
        <ChessBoard
          board={board}
          setBoard={setBoard}
          swapPlayers={swapPlayers}
          currentPlayer={currentPlayer}
          setMovesList={setMovesList}
          restart={restart}
        />
      </div>
      <div className=" bg-[#00000030] flex-auto custom-scrollbar rounded-[10px] min-h-full max-h-[calc(100vh-2.5rem)] overflow-y-auto overflow-x-hidden">
        <div className="bg-dark-4 text-white py-1 px-3 primary-shadow">Move List</div>
        <div className="text-light-2 min-w-[200px] grid grid-cols-2 p-1">
          {movesList.map((item, index) => {
            return <div className='flex items-center select-none' key={index}>
              <img src={`${item.figure?.logo}`} className='h-5' alt={`${item.figure?.name}`} />
              {`${transformCoordinates(item.from, item.to)}`}</div>
          })}
        </div>
      </div>
    </div>
  );
}
