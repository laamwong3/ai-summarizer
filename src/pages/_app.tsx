import { createTheme, NextUIProvider, useSSR } from "@nextui-org/react";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { trpc } from "@/utils/trpc";

const theme = createTheme({
  type: "light",

  theme: {
    colors: {
      background: "#26292B",
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  const { isBrowser } = useSSR();

  return isBrowser ? (
    <NextUIProvider theme={theme}>
      <Component {...pageProps} />
    </NextUIProvider>
  ) : null;
}

export default trpc.withTRPC(App);
