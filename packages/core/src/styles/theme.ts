import type { DefaultTheme } from "styled-components";
import { colors } from "./colors";
import { fonts } from "./fonts";

export const theme = (maxWidth: string): DefaultTheme => ({
  colors,
  fonts,
  layout: { maxWidth },
});

export type ThemeType = ReturnType<typeof theme>;
