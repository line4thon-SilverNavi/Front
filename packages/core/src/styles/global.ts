import { createGlobalStyle, css } from "styled-components";

export const global = (maxWidth: string) => css`
  ${resetCSS}

  @font-face {
    font-family: "Pretendard";
    src: url("/fonts/PretendardVariable.woff2") format("woff2");
  }

  body {
    width: 100vw;
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
    background-color: white;
    min-height: 100dvh; /* 여기도 vh 대신 d/vh */
    height: 100svh; /* iOS Safari 대응 */
  }
`;

const resetCSS = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
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

  html,
  body,
  #root {
    height: 100%;
    min-height: 100dvh; /* 동적 뷰포트 */
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
