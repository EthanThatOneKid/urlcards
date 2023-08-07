import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/global.css" />
        <link rel="stylesheet" href="/theme.css" />
      </Head>
      <Component />
    </>
  );
}
