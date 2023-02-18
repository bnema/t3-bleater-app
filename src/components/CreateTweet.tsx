import { useState } from "react";
import { api } from "../utils/api";
import { z } from "zod";
import { signIn, signOut, useSession } from "next-auth/react";

export const tweetSchema = z.object({
  text: z.string(
    {
      required_error: "Tweet of 10 to 280 characters is required",
    }
  ).min(10).max(280),
});

export function CreateTweet() {
  const { data: session, status } = useSession();
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { mutateAsync } = api.tweet.createTweet.useMutation();
  const getAllTweets = api.tweet.getAllTweets.useQuery();
  
 async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(text);

    try {
      tweetSchema.parse({ text });
      await mutateAsync({ text });

    } catch (error) {
      setError(error);
    } finally {
      // refetch the timeline to get the new tweet
      getAllTweets.refetch();
      setText("");
    }
  }
  // if the user is not logged in we hide the form
  if (status === "loading") {
    return null;
  } else if (!session) {
    return null;
  }
  

  return (
    <>
    <form onSubmit={handleSubmit} className="flex flex-col p-4 border-2 rounded-md bg-graywolf-800 border-graywolf-700">
        <input value={text} onChange={(e) => setText(e.target.value)} className="p-2 mb-2 border-2 rounded-md bg-graywolf-500 border-graywolf-400" />
        <div className="flex justify-end">
            <button type="submit" className="p-2 border-2 rounded-md bg-cyan-700 border-cyan-500 hover:bg-cyan-600 hover:text-cyan-400 transition-colors delay-100">
              Envoyer</button>
        </div>
    </form>
    </>
    );
        
}