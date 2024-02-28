import { PrimaryLink } from "@/components/PrimaryLink";

export default function Home() {
  return (
    <div className="flex-center min-h-[100dvh]">
      <PrimaryLink to="/play">play</PrimaryLink>
    </div>
  );
}
