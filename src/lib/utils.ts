import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Cell } from "./models/Cell";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const syncPointer = ({ x: PointerX, y: PointerY }: { x: number; y: number }) => {
  const x = PointerX.toFixed(2);
  const y = PointerY.toFixed(2);
  const xp = (PointerX / window.innerWidth).toFixed(2);
  const yp = (PointerY / window.innerWidth).toFixed(2);
  document.documentElement.style.setProperty("--x", x);
  document.documentElement.style.setProperty("--xp", xp);
  document.documentElement.style.setProperty("--y", y);
  document.documentElement.style.setProperty("--yp", yp);
};

enum Coordinates {
  "A" = 0,
  "B" = 1,
  "C" = 2,
  "D" = 3,
  "E" = 4,
  "F" = 5,
  "G" = 6,
  "H" = 7
}

const transformCoordinates = (cell: Cell ) => {
  const letter = Coordinates[cell.x]
  return `${letter}${8 - cell.y}`;
}

export {syncPointer, transformCoordinates};