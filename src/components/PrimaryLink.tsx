"use client"
import usePointerMove from "@/hooks/usePointerMove";
import syncPointer from "@/lib/utils";
import Link from "next/link";
export const PrimaryLink = (props : any) => {
  usePointerMove((event) => {
    syncPointer({ x: event.clientX, y: event.clientY });
  });
  return (
    <>
      <Link href={props.to}>
        <span className="link uppercase select-none font-bold tracking-[0.1ch] cursor-pointer transition-[background-size] duration-[0.24s] touch-none relative p-[0.3rem]">
          <span className="text-black">
            {props.children}
          </span>
        </span>
      </Link>
      <style jsx>{`
        .link span {
          background: var(--glow), black;
          background-clip: text;
          color: transparent;
          height: 100%;
          width: 100%;
          z-index: 2;
          position: relative;
          inset: 0;
        }
        .link::before {
          content: "";
          transition: width 0.3s ease, left 0.3s ease;
          left: 50%;
          bottom: 0;
          width: 0;
          height: 0.19rem;
          border-radius: 0.19rem;
          position: absolute;
          background: var(--glow), black;
        }
        .link:hover::before {
          width: 100%;
          left: 0;
        }
        .link::after {
          content: "";
          position: absolute;
          inset: -4px;
          filter: blur(20px);
          background: var(--little-glow);
        }

      `}</style>
    </>
  )
}