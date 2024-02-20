import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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

export default syncPointer;