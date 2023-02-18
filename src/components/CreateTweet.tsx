import { useState } from "react";
import { api } from "../utils/api";
import { z } from "zod";

export const tweetSchema = z.object({
  text: z.string(
    {
      required_error: "Tweet is required",
    }
  ).min(10).max(280),
});

export function CreateTweet() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const { mutateAsync } = api.tweet.createTweet.useMutation();
 async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(text);

    try {
      tweetSchema.parse({ text });
      await mutateAsync({ text });
    } catch (error) {
      setError(error);
    }
  }
  

  return (
    <>
    <form onSubmit={handleSubmit} className="flex flex-col p-4 border-2 rounded-md bg-graywolf-800 border-graywolf-700">
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="p-2 mb-2 border-2 rounded-md bg-graywolf-500 border-graywolf-400" />
        <div className="flex justify-end">
            <button type="submit" className="p-2 border-2 rounded-md bg-cyan-700 border-cyan-500 hover:bg-cyan-600 hover:text-cyan-400 transition-colors delay-100">
              Envoyer</button>
        </div>
    </form>
    </>
    );
        
}