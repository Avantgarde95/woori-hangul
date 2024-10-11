import { AppProps } from "next/app";
import Head from "next/head";
import { css, Global, Theme, ThemeProvider } from "@emotion/react";

const defaultTheme: Theme = {
  color: {
    primary: "#2a2a2a",
    highlight: "#797878",
    right: "#3079c3",
    wrong: "#f85d5d",
  },
};

const globalStyle = css`
  html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    font-family: "Pretendard", sans-serif;
    font-size: 16px;
  }

  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #__next {
    width: 100%;
    height: 100%;
  }
`;

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={defaultTheme}>
    <Head>
      <title>한글날 퀴즈 (우리들교회 ver.)</title>
    </Head>
    <Global styles={globalStyle} />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
