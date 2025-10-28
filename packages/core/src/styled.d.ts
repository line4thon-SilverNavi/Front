import "styled-components";
import type { colors } from "@core/styles/colors";
import type { fonts } from "@core/styles/fonts";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof colors;
    fonts: typeof fonts;
    layout: { maxWidth: string };
  }
}
