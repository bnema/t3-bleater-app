/* eslint-disable @typescript-eslint/no-misused-promises */
import Discord from "next-auth/providers/discord";
import { signIn, signOut, useSession } from "next-auth/react";

export function LoggedOutBanner() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return null;
    } else if (session) {
        return null;
    }
  
    async function handleSignIn() {
      try {
        await signIn("discord");
      } catch (error) {
        console.log(error);
      } 

    }
    

  return (
    <div className="fixed bottom-0 left-0 w-full bg-cyan-900 text-graywolf-100 p-5">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Bah alors on est pas connecté ?</h1>
        <p className="text-center">
          Qu&apos;est-ce que t&apos;attends Jonathan ?{" "}
          <button type="button" onClick={handleSignIn}
          className="text-cyan-500 underline">
          Clique ici</button>
        </p>
      </div>
    </div>
  );
}