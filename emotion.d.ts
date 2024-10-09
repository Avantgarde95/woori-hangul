import "@emotion/react";

declare module "@emotion/react" {
  interface Theme {
    color: {
      primary: string;
      highlight: string;
      background: string;
      right: string;
      wrong: string;
    };
  }
}
