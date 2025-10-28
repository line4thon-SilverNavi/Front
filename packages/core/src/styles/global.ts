import { createGlobalStyle, css } from "styled-components";

export const global = (maxWidth: string) => css`
  ${resetCSS}

  @font-face {
    font-family: "Pretendard";
    src: url("/fonts/PretendardVariable.woff2") format("woff2");
  }

  body {
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    font-family:
      "Pretendard Variable",
      system-ui,
      -apple-system,
      "Segoe UI",
      Roboto,
      "Helvetica Neue",
      Arial,
      "Noto Sans KR",
      sans-serif;
    background-color: ${({ theme }) => theme.colors.blue03};
  }

  #root {
    max-width: ${maxWidth};
    width: 100%;
    margin: 0 auto;
    background-color: white;
  }
`;

const resetCSS = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  ul,
  ol {
    list-style: none;
  }

  html,
  body {
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const GlobalStyle = createGlobalStyle<{
  maxWidth: string;
}>`
  ${({ maxWidth }) => global(maxWidth)}
`;
