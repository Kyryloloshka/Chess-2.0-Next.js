import { Cell } from "@/lib/models/Cell";

interface CellComponentProps {
  click?: Function;
  cell: Cell;
  selected?: Cell;
}

function CellComponent({ click, cell, selected }: CellComponentProps) {
	
	return (
		<div style={{ background: cell.available ? "green" : '' }} onClick={() => click ? click(cell) : null} className={["cell", cell.color, selected ? 'selected' : ''].join(' ')}>
		</div>
	)
}

export default CellComponent