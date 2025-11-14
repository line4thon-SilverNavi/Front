import { Wrapper, SectionTitle, Field, Label } from "./BasicSection";
import styled from "styled-components";

type Props = {
  description: string;
  onDescriptionChange: (v: string) => void;
};

export default function DescriptionSection({
  description,
  onDescriptionChange,
}: Props) {
  const length = description.length;

  return (
    <Wrapper>
      <SectionTitle>시설 소개</SectionTitle>
      <Field>
        <Label>소개 내용</Label>
        <Textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="시설에 대한 소개를 입력해 주세요."
          rows={6}
        />
        <Helper>{length} / 500자</Helper>
      </Field>
    </Wrapper>
  );
}

const Textarea = styled.textarea`
  border-radius: 10px;
  border: none;
  padding: 10px 12px;
  margin-top: 10px;
  ${({ theme }) => theme.fonts.body2};
  background: ${({ theme }) => theme.colors.gray02};
  border: 1.496px solid ${({ theme }) => theme.colors.gray03};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.gray06};

  &:focus {
    border: none;
    outline: none;
  }
`;

const Helper = styled.span`
  align-self: flex-start;
  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme }) => theme.colors.gray04};
  margin-top: 5px;
`;
