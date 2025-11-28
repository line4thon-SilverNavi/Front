import { useId, useState } from "react";
import styled, { css } from "styled-components";
import openIcon from "../assets/img/auth/open.png";
import closeIcon from "../assets/img/auth/close.png";
import type { DefaultTheme } from "styled-components";

type FontKey = keyof DefaultTheme["fonts"];

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: "text" | "password" | "tel" | "email" | "number" | "date" | "time";
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  showToggleForPassword?: boolean;
  clickable?: boolean;
  onClickInput?: () => void;
  labelTypo?: FontKey;
  inputTypo?: FontKey;
  descTypo?: FontKey;
  width?: string;
  height?: string;
  variant?: "underline" | "filled";
  prefixIcon?: React.ReactNode;
  labelColor?: string;
};

export default function InputContainer({
  label,
  variant = "underline",
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  inputMode,
  maxLength,
  helperText,
  errorText,
  required,
  showToggleForPassword,
  clickable = false,
  onClickInput,
  labelTypo = "body1",
  inputTypo = "body2",
  width,
  height,
  prefixIcon,
  labelColor,
}: Props) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const rightIconVisible = isPassword && showToggleForPassword;

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!clickable || !onClickInput) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClickInput();
    }
  };

  return (
    <Field>
      <Label htmlFor={id} $labelTypo={labelTypo} $labelColor={labelColor}>
        {label} {required && <em aria-hidden>*</em>}
      </Label>

      <InputRow $error={!!errorText} $variant={variant}>
        {prefixIcon && <PrefixSlot aria-hidden>{prefixIcon}</PrefixSlot>}
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          type={isPassword ? (show ? "text" : "password") : type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          aria-invalid={!!errorText}
          $isPassword={isPassword}
          readOnly={clickable}
          onClick={clickable ? onClickInput : undefined}
          onKeyDown={clickable ? onKey : undefined}
          role={clickable ? "button" : undefined}
          aria-haspopup={clickable ? "listbox" : undefined}
          tabIndex={clickable ? 0 : undefined}
          $clickable={clickable}
          $inputTypo={inputTypo}
          $hasPrefix={!!prefixIcon}
        />

        {rightIconVisible && (
          <IconButton
            onClick={() => setShow((p) => !p)}
            width={width}
            height={height}
          >
            <img src={show ? openIcon : closeIcon} />
          </IconButton>
        )}
      </InputRow>

      {(helperText || errorText) && (
        <Desc id={`${id}-desc`} $error={!!errorText}>
          {errorText ?? helperText}
        </Desc>
      )}
    </Field>
  );
}

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label<{ $labelTypo: FontKey; $labelColor?: string }>`
  ${({ theme, $labelTypo }) => theme.fonts[$labelTypo]};
  color: ${({ theme, $labelColor }) => $labelColor ?? theme.colors.gray05};
  em {
    color: ${({ theme }) => theme.colors.signal};
    font-style: normal;
    margin-left: 2px;
  }
`;

const InputRow = styled.div<{
  $error: boolean;
  $variant: "underline" | "filled";
}>`
  position: relative;
  display: flex;
  align-items: center;
  ${({ $variant, theme, $error }) =>
    $variant === "underline" &&
    css`
      border-bottom: 1px solid
        ${$error ? theme.colors.alert : theme.colors.gray03};
      padding: 10px 0;

      &:focus-within {
        border-bottom-color: ${$error
          ? theme.colors.alert
          : theme.colors.blue02};
      }
    `}

  ${({ $variant, theme, $error }) =>
    $variant === "filled" &&
    css`
      border-radius: 10px;
      background: ${theme.colors.gray02};
      padding: 12px 16px;
      border: 1px solid transparent;

      &:focus-within {
        border-color: ${$error ? theme.colors.alert : theme.colors.gray02};
      }
    `}
`;

const PrefixSlot = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none; /* 클릭 방해 X */
  img,
  svg {
    width: 20px;
    height: 20px;
    opacity: 0.9;
  }
`;

const Input = styled.input<{
  $isPassword?: boolean;
  $clickable?: boolean;
  $inputTypo: FontKey;
  $hasPrefix?: boolean;
}>`
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  ${({ theme, $inputTypo }) => theme.fonts[$inputTypo]};
  color: ${({ theme }) => theme.colors.gray07};
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "text")};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray04};
  }

  padding-left: ${({ $hasPrefix }) => ($hasPrefix ? "30px" : "0")};

  /* 값이 없을 때 글자색을 플레이스홀더 색상으로 변경 */
  &:not([value=""]) {
    color: ${({ theme }) => theme.colors.gray07}; /* 값이 있을 때의 색상 */
  }
  &[value=""] {
    color: ${({ theme }) => theme.colors.gray04}; /* 값이 없을 때의 색상 */
  }

  /* date/time input 달력 아이콘 색상 조정 */
  &[type="date"],
  &[type="time"] {
    color-scheme: light;
    
    &::-webkit-calendar-picker-indicator {
      filter: invert(0);
      opacity: 0.7;
      cursor: pointer;
    }
  }
`;

const IconButton = styled.div<{ width?: string; height?: string }>`
  position: absolute;
  right: 0;
  line-height: 1;

  img {
    width: ${({ width }) => width || "24px"};
    height: ${({ height }) => height || "24px"};
    cursor: pointer;
  }
`;

const Desc = styled.p<{ $error: boolean }>`
  ${({ theme }) => theme.fonts.caption};
  ${({ $error, theme }) =>
    $error
      ? css`
          color: ${theme.colors.alert};
        `
      : css`
          color: ${theme.colors.gray04};
        `}
`;
