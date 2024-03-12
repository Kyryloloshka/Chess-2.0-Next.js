import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Cell } from "./models/Cell";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

export {transformCoordinates};