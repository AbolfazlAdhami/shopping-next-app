import { ContextProvider } from "@/context/contextApi";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ContextProvider>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </ContextProvider>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const { push } = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      push("/unauthorized");
    },
  });
  if (status == "loading") return "Loading...";
  return children;
}

export default App;
