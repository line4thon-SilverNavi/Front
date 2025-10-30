import { useId, useState } from "react";
import styled, { css } from "styled-components";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: "text" | "password" | "tel" | "email" | "number";
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  showToggleForPassword?: boolean;
};

export default function InputContainer({
  label,
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
}: Props) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const rightIconVisible = isPassword && showToggleForPassword;

  return (
    <Field>
      <Label htmlFor={id}>
        {label} {required && <em aria-hidden>*</em>}
      </Label>

      <InputRow $error={!!errorText}>
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
        />

        {rightIconVisible && (
          <IconButton onClick={() => setShow((p) => !p)}>
            {show ? (
              <img src="/img/auth/open.png" />
            ) : (
              <img src="/img/auth/close.png" />
            )}
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
`;

const Label = styled.label`
  ${({ theme }) => theme.fonts.label};
  color: ${({ theme }) => theme.colors.gray05};
  em {
    color: ${({ theme }) => theme.colors.alert};
    font-style: normal;
    margin-left: 2px;
  }
`;

const InputRow = styled.div<{ $error: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid
    ${({ theme, $error }) =>
      $error ? theme.colors.alert : theme.colors.gray03};
  padding: 10px 0;

  &:focus-within {
    border-bottom-color: ${({ theme, $error }) =>
      $error ? theme.colors.alert : theme.colors.blue02};
  }
`;

const Input = styled.input<{ $isPassword?: boolean }>`
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray07};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray04};
  }
`;

const IconButton = styled.div`
  position: absolute;
  right: 0;
  line-height: 1;

  img {
    width: 24px;
    height: 24px;
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
