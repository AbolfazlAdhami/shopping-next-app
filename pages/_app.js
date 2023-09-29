import { ContextProvider } from "@/context/contextApi";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";

export default function App({ Component,  pageProps: { session, ...pageProps },}) {
  return (
    <SessionProvider session={session}> 
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </SessionProvider>
  );
}
