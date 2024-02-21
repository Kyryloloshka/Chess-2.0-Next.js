import { Cell } from "@/lib/models/Cell";

interface CellComponentProps {
  click: Function;
  cell: Cell;
  selected: boolean;
}

function CellComponent({ click, cell, selected }: CellComponentProps) {
	console.log(cell.figure?.logo);
  
	return (
		<div style={{ background: cell.available && cell.figure ? "green" : '' }} onClick={() => click && click(cell)} className={["flex-center", cell.color, selected ? 'selected' : ''].join(' ')}>
			{cell.available && !cell.figure && <div className="h-[25%] w-[25%] rounded-full bg-[#bbffa090]"></div>}
			{cell.figure?.logo && <img className="h-[90%] w-[90%]" src={cell.figure.logo} alt={`${cell.figure.name}`} />}
		</div>
	)
}

export default CellComponent