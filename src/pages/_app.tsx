import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";
import { Global, ThemeProvider } from "@emotion/react";

import { globalStyle } from "common/styles/Global";
import { defaultTheme } from "common/styles/Theme";

const App = ({ Component, pageProps }: AppProps) => (
  <RecoilRoot>
    <ThemeProvider theme={defaultTheme}>
      <Global styles={globalStyle} />
      <Component {...pageProps} />
    </ThemeProvider>
  </RecoilRoot>
);

export default App;
