import { useId } from "react";
import styled, { css } from "styled-components";
import type { DefaultTheme } from "styled-components";

type FontKey = keyof DefaultTheme["fonts"];

type Props = {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  labelTypo?: FontKey;
  buttonTypo?: FontKey;
};

export default function ToggleButtonGroup({
  label,
  options,
  value,
  onChange,
  helperText,
  errorText,
  required,
  labelTypo = "body1",
  buttonTypo = "body3",
}: Props) {
  const id = useId();

  return (
    <Field>
      <Label htmlFor={id} $labelTypo={labelTypo}>
        {label} {required && <em aria-hidden>*</em>}
      </Label>

      <ButtonWrapper>
        {options.map((option) => (
          <ToggleButton
            key={option.value}
            type="button"
            $isSelected={value === option.value}
            $buttonTypo={buttonTypo}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </ToggleButton>
        ))}
      </ButtonWrapper>

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

const ButtonWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const ToggleButton = styled.button<{
  $isSelected: boolean;
  $buttonTypo: FontKey;
}>`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  height: 3.8rem;
  ${({ theme}) => theme.fonts.body2};
  cursor: pointer;
  transition: all 0.2s;

  ${({ $isSelected, theme }) =>
    $isSelected
      ? css`
        background: ${theme.colors.blue02};
        color: ${theme.colors.blue01};
        border: 1px solid ${({ theme }) => theme.colors.blue01};
        ${({ theme}) => theme.fonts.title01};
        `
      : css`
          background: ${theme.colors.gray02};
          color: ${theme.colors.gray06};
        `}

  &:hover {
    opacity: 0.8;
  }

  /* 화면 너비가 400px 이하일 때 (버튼이 약 158px 이하가 됨) */
  @media (max-width: 400px) {
    ${({ theme }) => theme.fonts.body3};
    padding: 10px 12px;
    
    ${({ $isSelected, theme }) =>
      $isSelected &&
      css`
        ${theme.fonts.body3};
      `}
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
