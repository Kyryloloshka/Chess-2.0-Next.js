"use client"
import usePointerMove from "@/hooks/usePointerMove";
import syncPointer from "@/lib/utils";
export const PrimaryButton = (props : any) => {
  usePointerMove((event) => {
    syncPointer({ x: event.clientX, y: event.clientY });
  });
  return (
    <>
      <button style={{background: "linear-gradient(var(--bg), var(--bg)) padding-box, var(--glow), linear-gradient(black, black) border-box"}} className="select-none uppercase font-bold tracking-[0.1ch] shadow-[0_1px_hsl(0_0%_100%_/_0.15)_inset] cursor-pointer transition-[background-size] duration-[0.24s] touch-none relative px-8 py-[0.7rem] rounded-2xl border-4 border-solid border-transparent" {...props}>
        <span className="text-black">
          {props.children}
        </span>
      </button>
      <style jsx>{`
        button {
          background: var(--bg);
        }

        button::before {
          content: "";
          position: absolute;
          inset: 0;
          box-shadow: 0 1px hsl(0 0% 100% / 0.15) inset;
          background: var(--bg);
          z-index: 2;
          border-radius: 1rem;
        }

        button span {
          background: var(--glow), black;
          background-clip: text;
          color: transparent;
          height: 100%;
          width: 100%;
          z-index: 2;
          position: relative;
          inset: 0;
        }

        

        button::after {
          content: "";
          position: absolute;
          inset: -4px;
          filter: blur(20px);
          border: 4px solid transparent;
          background: var(--glow);
          border-radius: 1rem;
        }
      `}</style>
    </>
  )
}