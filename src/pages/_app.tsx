import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";
import { Noto_Sans_KR, Jua } from "next/font/google";
import { css, Global, Theme, ThemeProvider } from "@emotion/react";

const font = Jua({ weight: ["400"], subsets: ["latin"] });

const defaultTheme: Theme = {
  color: {
    primary: "#2a2a2a",
    highlight: "#797878",
    background: "#f3f3f3",
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
  <RecoilRoot>
    <ThemeProvider theme={defaultTheme}>
      <Global styles={globalStyle} />
      <Component {...pageProps} />
    </ThemeProvider>
  </RecoilRoot>
);

export default App;
