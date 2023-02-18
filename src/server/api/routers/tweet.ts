import { string, z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";


export const tweetRouter = createTRPCRouter({
    createTweet: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input, ctx }) => {
        const { prisma, session } = ctx;
        const { text } = input;
        const userId = session?.user?.id;
        if (!userId) {
            throw new Error("Not authenticated");
        }
       try {
        const tweet = await prisma.tweet.create({
            data: {
                text,
                author: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        // when a new tweet is created, we want to return it to the client and update the timeline in real time

        // publish the tweet to the topic
        return tweet;
         } catch (error) {
            console.log(error);
            throw new Error("Error creating tweet");
        }
    }),
    updateTweet: protectedProcedure
    .input(z.object({ id: z.number(), text: z.string() }))
    .mutation(async ({ input, ctx }) => {
        const { prisma, session } = ctx;
        const { id, text } = input;
        const uuid = id.toString();
        const userId = session?.user?.id;
        if (!userId) {
            throw new Error("Not authenticated");
        }
        try {
            const tweet = await prisma.tweet.update({
                where: {
                    id: uuid,
                },
                data: {
                    text,
                },
            });
            return tweet;
        } catch (error) {
            console.log(error);
            throw new Error("Error updating tweet");
        }
    }),
    deleteTweet: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
        const { prisma, session } = ctx;
        const { id } = input;
        // id is a uuid so we need to convert it to a string
        const uuid = id.toString();
        const userId = session?.user?.id;
        if (!userId) {
            throw new Error("Not authenticated");
        }
        try {
            const tweet = await prisma.tweet.delete({
                where: {
                    id: uuid,
                },
            });
            return tweet;
        } catch (error) {
            console.log(error);
            throw new Error("Error deleting tweet");
        }
    }),
    // get all tweets from the database for the timeline
    getAllTweets: publicProcedure
    .query(async ({ ctx }) => {
        const { prisma } = ctx;
        try {
            const tweets = await prisma.tweet.findMany({
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    author: true,
                },
                
            });
            return tweets;
        } catch (error) {
            console.log(error);
            throw new Error("Error getting tweets");
        }
    }),
    
});