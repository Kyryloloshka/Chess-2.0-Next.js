import { Cell } from "@/lib/models/Cell";

interface CellComponentProps {
  click?: Function;
  cell: Cell;
  selected?: Cell;
}

function CellComponent({ click, cell, selected }: CellComponentProps) {
	
	return (
		<div style={{ background: cell.available ? "green" : '' }} onClick={() => click ? click(cell) : null} className={["flex justify-center items-center", cell.color, selected ? 'selected' : ''].join(' ')}>
      <div className="w-3 h-3"></div>
    </div>
	)
}

export default CellComponent