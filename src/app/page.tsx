"use client"
import { PrimaryLink } from "@/components/PrimaryLink";
import useAuth from "@/contexts/authContext";

export default function Home() {
  const currentUser = useAuth()
  return (
      <div className="flex-center min-h-[100dvh]">
        <PrimaryLink to="/play">play</PrimaryLink>
        {currentUser.currentUser && <>
          Hello {currentUser.currentUser.displayName ? currentUser.currentUser.displayName : currentUser.currentUser.email}, you are now logged in.
        </>}
      </div>
  );
}
