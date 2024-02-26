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
  "a" = 0,
  "b" = 1,
  "c" = 2,
  "d" = 3,
  "e" = 4,
  "f" = 5,
  "g" = 6,
  "h" = 7
}

const transformCoordinates = (cellFrom: Cell, cellTo: Cell ) => {
  const letterFrom = Coordinates[cellFrom.x]
  const letterTo = Coordinates[cellTo.x]
  return `${letterFrom}${8 - cellFrom.y} ${letterTo}${8 - cellTo.y}`;
}

export {syncPointer, transformCoordinates};