import { CreateTweet } from "./CreateTweet";
import { api } from "../utils/api";
import { z } from "zod";
import Image from "next/image";
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// import 'dayjs/locale/fr'
import locales from 'dayjs/locale/fr'
// import en from 'dayjs/locale/en'


export function Timeline() {
    const { data, error, isLoading } = api.tweet.getAllTweets.useQuery();
    
    // We do a refetch every 5 seconds to update the timeline
    api.tweet.getAllTweets.useQuery(undefined, {
        refetchInterval: 5000,
    });

    
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>no data</div>;
    }
    dayjs.extend(relativeTime)
    // if the browser is in FR, use locales FR for dayjs and relativeTime
    if (navigator.language === 'fr-FR') {
        dayjs.locale(locales)
        
    } else {
        dayjs.locale('en')
    }

    return (
        <>
        <CreateTweet />
        <div className="flex flex-col p-4 mt-4 border-2 rounded-md bg-graywolf-800 border-graywolf-700">
            {data.map((tweet) => (
                <div key={tweet.id} className="flex flex-col p-4 rounded-md mb-4 bg-graywolf-700">
                    {/* left author image, right tweet content */}
                    <div className="flex flex-row">
                        <div className="flex flex-col  justify-center">
                            <div className="">
                            <Image src={tweet?.author?.image} width="48" height="48" alt="avatar" className="rounded-full z-0" />
                           </div>
                        </div>
                        <div className="flex flex-col ml-4">
                            {/* author.name on top of the avatar image */}
                            <span className="text-l font-bold text-graywolf-100 ">{tweet.author.name}</span>

                            <span className="text-sm text-graywolf-300">{tweet.text}</span>
                            <span className="text-sm text-graywolf-300">{dayjs(tweet.createdAt).fromNow()}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
           
        </>
    );
}