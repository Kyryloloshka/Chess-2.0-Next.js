import { PrimaryLink } from "@/components/PrimaryLink";
import AuthProvider from "@/components/auth";

export default function Home() {
  return (
    <div className="flex-center min-h-[100dvh]">
      <AuthProvider/>
      <PrimaryLink to="/play">play</PrimaryLink>
    </div>
  );
}
