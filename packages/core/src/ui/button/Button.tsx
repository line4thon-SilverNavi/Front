import type { ButtonHTMLAttributes, ReactNode } from "react";
import styled, { css } from "styled-components";
import type { DefaultTheme } from "styled-components";
import { fonts } from "../../styles/fonts";

export type Tone = "blue" | "gray";
export type Variant = "solid" | "subtle" | "outline";
export type Size = "sm" | "md" | "lg";
type FontKey = keyof typeof fonts;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: Tone;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  radius?: "sm" | "md" | "lg" | "pill" | string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  typo?: FontKey;
}

// 사이즈 세팅
const SIZE_MAP: Record<Size, { h: string; pad: string }> = {
  sm: { h: "36px", pad: "8px 14px" },
  md: { h: "44px", pad: "12px 18px" },
  lg: { h: "52px", pad: "16px 60px" },
};

// tone별 색상
const toneColor = (theme: DefaultTheme, tone: Tone) => {
  const c = theme.colors;
  switch (tone) {
    case "gray":
      return {
        base: c.gray07,
        bg: c.gray03,
        subtle: c.gray02,
      };
    default:
      return {
        base: c.blue01,
        bg: c.blue02,
        subtle: c.blue03,
      };
  }
};

// 버튼 스타일
const Base = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["$tone", "$variant", "size", "fullWidth", "radius", "$typo"].includes(
      prop as string
    ),
})<{
  $tone: Tone;
  $variant: Variant;
  size: Size;
  fullWidth?: boolean;
  radius?: "sm" | "md" | "lg" | "pill" | string;
  $typo?: FontKey;
}>`
  /* 색/variant */
  ${({
    theme,
    $tone,
    $variant,
  }: {
    theme: DefaultTheme;
    $tone: Tone;
    $variant: Variant;
  }) => {
    const t = toneColor(theme, $tone);

    if ($variant === "outline") {
      return css`
        background: transparent;
        color: ${t.base};
        border: 1px solid ${t.base};
      `;
    }

    if ($variant === "subtle") {
      return css`
        background: ${t.subtle};
        color: ${t.base};
        border: 1px solid transparent;
      `;
    }

    /* solid */
    return css`
      background: ${t.base};
      color: ${$tone === "gray" ? theme.colors.gray01 : "#ffffff"};
      border: 1px solid transparent;
    `;
  }}

  // 레이아웃/사이즈/타이포 
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  height: ${({ size }) => SIZE_MAP[size].h};
  padding: ${({ size }) => SIZE_MAP[size].pad};
  font-weight: 600;

  ${({ $typo }) => ($typo ? fonts[$typo] : fonts.title1)}

  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  border-radius: ${({ radius }) => {
    if (!radius) return "8px";
    if (
      typeof radius === "string" &&
      (radius.endsWith("px") || radius.endsWith("rem") || radius.endsWith("%"))
    ) {
      return radius;
    }
    if (radius === "pill") return "999px";
    switch (radius) {
      case "sm":
        return "6px";
      case "md":
        return "8px";
      case "lg":
        return "12px";
      default:
        return "8px";
    }
  }};

  &:disabled {
    background: ${({ theme }) => theme.colors.gray05};
    color: ${({ theme }) => theme.colors.gray01};
    border-color: transparent;
    cursor: not-allowed;
  }
`;

const Content = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const Button: React.FC<ButtonProps> = ({
  tone = "blue",
  variant = "solid",
  size = "md",
  radius = "md",
  fullWidth = false,
  leftIcon,
  rightIcon,
  loading,
  typo,
  children,
  disabled,
  ...rest
}) => {
  const isDisabled = disabled || loading;
  return (
    <Base
      {...rest}
      $tone={tone}
      $variant={variant}
      size={size}
      radius={radius}
      fullWidth={fullWidth}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading || undefined}
      $typo={typo}
    >
      <Content>
        {leftIcon}
        {children}
        {rightIcon}
      </Content>
    </Base>
  );
};

export default Button;
