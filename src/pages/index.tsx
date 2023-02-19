import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { Timeline } from "../components/Timeline";
import { Container } from "../components/Container";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Bleater - It&apos;s twitter but shittier</title>
        <meta name="description" content="Bleater - It&apos;s twitter but shittier" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-b from-graywolf-900 to-graywolf-800 min-h-screen">
        
        <Container>
            <Timeline />
        </Container>

    
        
     </main>
    
    </>
  );
};

export default Home;
