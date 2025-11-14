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
  placeholderTypo?: FontKey;
  labelColor?: string;
  placeholderColor?: string;
  backgroundColor?: string;
  border?: string;
  readOnly?: boolean;
  readOnlyEmptyText?: string;
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
  placeholderTypo = "body3",
  labelColor,
  readOnly,
  placeholderColor,
  backgroundColor,
  border,
  readOnlyEmptyText = "작성되지 않았습니다.",
}: Props) {
  const id = useId();
  const trimmed = value.trim();

  if (readOnly) {
    return (
      <Field>
        <Label htmlFor={id} $labelTypo={labelTypo} $labelColor={labelColor}>
          {label} {required && <em aria-hidden>*</em>}
        </Label>

        <ReadOnlyBox aria-readonly="true">
          {trimmed !== "" ? trimmed : readOnlyEmptyText}
        </ReadOnlyBox>

        {(helperText || errorText) && (
          <Desc
            id={`${id}-desc`}
            $error={!!errorText}
            $info={!!helperText && !errorText}
          >
            {errorText ?? helperText}
          </Desc>
        )}
      </Field>
    );
  }

  return (
    <Field>
      <Label htmlFor={id} $labelTypo={labelTypo} $labelColor={labelColor}>
        {label} {required && <em aria-hidden>*</em>}
      </Label>

      <TextAreaWrapper $error={!!errorText} $backgroundColor={backgroundColor} $border={border}>
        <TextArea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          aria-invalid={!!errorText}
          $textareaTypo={textareaTypo}
          $phTypo={placeholderTypo}
          $phColor={placeholderColor}
        />
      </TextAreaWrapper>

      {(helperText || errorText) && (
        <Desc
          id={`${id}-desc`}
          $error={!!errorText}
          $info={!!helperText && !errorText}
        >
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

const Label = styled.label<{
  $labelTypo: FontKey;
  $labelColor?: string;
  $markColor?: string;
}>`
  ${({ theme, $labelTypo }) => theme.fonts[$labelTypo]};
  color: ${({ theme, $labelColor }) => $labelColor ?? theme.colors.gray05};
  margin-bottom: 10px;

  em {
    color: ${({ theme, $markColor }) => $markColor ?? theme.colors.alert};
    font-style: normal;
    margin-left: 2px;
  }
`;

const TextAreaWrapper = styled.div<{ $error: boolean; $backgroundColor?: string; $border?: string }>`
  display: flex;
  border-radius: 10px;
  background: ${({ theme, $backgroundColor }) => $backgroundColor ?? theme.colors.gray02};
  padding: 14px 16px;
  border: ${({ $border }) => $border ?? '1px solid transparent'};
  transition: border-color 0.2s;

  &:focus-within {
    border-color: ${({ theme, $error }) =>
      $error ? theme.colors.alert : theme.colors.gray02};
  }
`;

const TextArea = styled.textarea<{
  $textareaTypo: FontKey;
  $phTypo: FontKey;
  $phColor?: string;
}>`
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  resize: none;
  ${({ theme, $textareaTypo }) => theme.fonts[$textareaTypo]};
  color: ${({ theme }) => theme.colors.gray07};
  min-height: 100px;

  &::placeholder {
    color: ${({ theme, $phColor }) => $phColor ?? theme.colors.gray05};
    ${({ theme, $phTypo }) => theme.fonts[$phTypo]};
  }
`;

// 완료(readOnly)일 때
const ReadOnlyBox = styled.div`
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.gray02};
  padding: 14px 16px;
  min-height: 100px;
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray07};
  white-space: pre-wrap;
`;

const Desc = styled.p<{ $error?: boolean; $info?: boolean }>`
  ${({ theme }) => theme.fonts.caption};

  ${({ $error, $info, theme }) => {
    if ($error) {
      return css`
        color: ${theme.colors.alert};
      `;
    }

    if ($info) {
      return css`
        color: ${theme.colors.gray05};
        ${theme.fonts.label2};
      `;
    }

    return css`
      color: ${theme.colors.gray04};
    `;
  }}
`;
