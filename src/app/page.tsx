"use client"
import { Button } from "@/components/ui/button";
import useAuth from "@/contexts/authContext";
import { doSignOut } from "@/lib/firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const currentUser = useAuth()
  const router = useRouter()
  
  return (
      <div className="flex-center min-h-[100dvh] flex-col gap-4">
        <Link href='/play'><Button variant={"neon"}>play</Button></Link>
        <span className="text-white text-xl text-center">
          {currentUser.currentUser && <>
            Hello {currentUser.currentUser.displayName ? currentUser.currentUser.displayName : currentUser.currentUser.email}, you are now logged in.
            <button onClick={() => { doSignOut().then(() => { router.replace("/login") }) }} className='text-sm text-blue-600 underline'>Logout</button>
          </>}
        </span>
      </div>
  );
}
