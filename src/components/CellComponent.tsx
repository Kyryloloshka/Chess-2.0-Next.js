import { Cell } from "@/lib/models/Cell";

interface CellComponentProps {
  click: Function;
  cell: Cell;
  selected: boolean;
}

function CellComponent({ click, cell, selected }: CellComponentProps) {
	return (
		<div 
			style={{ background: cell.available && cell.figure ? "#d98fef" : '' }} 
			onClick={() => click && click(cell)} 
			className={["flex-center", cell.color, selected ? 'selected' : ''].join(' ')}
		>
			{cell.available && !cell.figure && <div className="h-[25%] w-[25%] rounded-full bg-[#c96fdfaa]"></div>}
			{cell.figure?.logo && <img className="h-[90%] w-[90%]" src={cell.figure.logo} alt={`${cell.figure.name}`} />}
		</div>
	)
}

export default CellComponent