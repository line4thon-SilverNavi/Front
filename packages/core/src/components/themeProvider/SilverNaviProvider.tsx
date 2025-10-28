import type { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../../styles/global";
import { theme } from "../../styles/theme";

type SilverNaviProviderProps = PropsWithChildren<{
  maxWidth?: string;
}>;

const SilverNaviProvider = ({
  maxWidth = "none",
  children,
}: SilverNaviProviderProps) => {
  return (
    <ThemeProvider theme={theme(maxWidth)}>
      <GlobalStyle maxWidth={maxWidth} />
      {children}
    </ThemeProvider>
  );
};

export default SilverNaviProvider;
