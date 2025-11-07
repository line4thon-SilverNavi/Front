import { css } from "styled-components";

export type FontStyle = typeof fonts;
export type FontStyleKey = keyof FontStyle;

const fontGenerator = (
  size: string,
  weight: number,
  lineHeight?: string,
  fontFamily?: string
) => css`
  font-family: ${fontFamily ? `${fontFamily};` : ""};
  font-size: ${size};
  font-weight: ${weight};
  line-height: ${lineHeight ? `${lineHeight}; ` : ""};
`;

export const fonts = {
  // head
  heading1: fontGenerator("1.75rem", 600),
  heading2: fontGenerator("1.5rem", 600),
  heading3: fontGenerator("1.125rem", 600),

  // title
  title1: fontGenerator("1.125rem", 600),
  title2: fontGenerator("1rem", 600),

  //body
  body1: fontGenerator("1rem", 600),
  body2: fontGenerator("1.125rem", 400),
  body3: fontGenerator("0.875rem", 400),
  body4: fontGenerator("0.8125rem", 400),

  //label
  label1: fontGenerator("1rem", 600),
  label2: fontGenerator("1rem", 400),
  caption: fontGenerator("0.75rem", 400),
};

export const FontList = Object.keys(fonts);
