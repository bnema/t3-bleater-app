import { signIn, signOut, useSession } from "next-auth/react";

export function LoggedOutBanner() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return null;
    } else if (session) {
        return null;
    }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-cyan-900 text-graywolf-100 p-5">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Bah alors on est pas connecté ?</h1>
        <p className="text-center">
          Qu'est-ce que t'attends Jonathan ?{" "}
          <button onClick={() => signIn()} className="text-cyan-500 underline">
          Clique ici</button>
        </p>
      </div>
    </div>
  );
}