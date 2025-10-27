import type { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../../styles/global";
import { theme } from "../../styles/theme";

type SilverNaviProviderProps = PropsWithChildren<{
  maxWidth?: string;
  isAdmin?: boolean;
}>;

const SilverNaviProvider = ({
  maxWidth = "none",
  isAdmin = false,
  children,
}: SilverNaviProviderProps) => {
  return (
    <ThemeProvider theme={theme(maxWidth)}>
      <GlobalStyle maxWidth={maxWidth} isAdmin={isAdmin} />
      {children}
    </ThemeProvider>
  );
};

export default SilverNaviProvider;
