import { useId } from "react";
import styled, { css } from "styled-components";
import type { DefaultTheme } from "styled-components";

type FontKey = keyof DefaultTheme["fonts"];

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  labelTypo?: FontKey;
  textareaTypo?: FontKey;
};

export default function TextAreaContainer({
  label,
  value,
  onChange,
  placeholder,
  helperText,
  errorText,
  required,
  rows = 5,
  maxLength,
  labelTypo = "body1",
  textareaTypo = "body3",
}: Props) {
  const id = useId();

  return (
    <Field>
      <Label htmlFor={id} $labelTypo={labelTypo}>
        {label} {required && <em aria-hidden>*</em>}
      </Label>

      <TextAreaWrapper $error={!!errorText}>
        <TextArea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          aria-invalid={!!errorText}
          $textareaTypo={textareaTypo}
        />
      </TextAreaWrapper>

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

const Label = styled.label<{ $labelTypo: FontKey }>`
  ${({ theme, $labelTypo }) => theme.fonts[$labelTypo]};
  color: ${({ theme }) => theme.colors.gray05};
  margin-bottom: 10px;
  em {
    color: ${({ theme }) => theme.colors.alert};
    font-style: normal;
    margin-left: 2px;
  }
`;

const TextAreaWrapper = styled.div<{ $error: boolean }>`
  display: flex;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.gray02};
  padding: 14px 16px;
  border: 1px solid transparent;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: ${({ theme, $error }) =>
      $error ? theme.colors.alert : theme.colors.gray02};
  }
`;

const TextArea = styled.textarea<{ $textareaTypo: FontKey }>`
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  resize: none;
  ${({ theme, $textareaTypo }) => theme.fonts[$textareaTypo]};
  color: ${({ theme }) => theme.colors.gray07};
  min-height: 100px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray05};
    ${({ theme }) => theme.fonts.body3};
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
