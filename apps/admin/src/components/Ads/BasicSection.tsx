import type { Category } from "@apis/Ads/types";
import CategoryDropdown from "@components/program/AddProgramModal/fields/CategoryModal";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  name: string;
  onNameChange: (v: string) => void;
  category: Category | null;
  onCategoryChange: (c: Category) => void;
};

const CATEGORY_OPTIONS: Category[] = [
  "요양병원",
  "요양원/요양센터",
  "데이케어센터",
];

export default function BasicSection({
  name,
  onNameChange,
  category,
  onCategoryChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const label = category ?? "카테고리를 선택해 주세요";

  return (
    <Wrapper>
      <SectionTitle>기본 정보</SectionTitle>
      <Grid>
        <Field>
          <Label>시설명</Label>
          <Input
            value={name}
            placeholder="시설명을 입력하세요"
            onChange={(e) => onNameChange(e.target.value)}
          />
        </Field>

        <Field>
          <Label>카테고리</Label>
          <SelectWrapper>
            <SelectButton
              type="button"
              onClick={() => setOpen(!open)}
              $placeholder={!category}
            >
              {label}
            </SelectButton>

            <CategoryDropdown<Category>
              open={open}
              value={category ?? ""}
              options={CATEGORY_OPTIONS}
              onSelect={(v) => {
                onCategoryChange(v);
                setOpen(false);
              }}
              onClose={() => setOpen(false)}
            />
          </SelectWrapper>
        </Field>
      </Grid>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SectionTitle = styled.h2`
  ${({ theme }) => theme.fonts.heading2};
  color: ${({ theme }) => theme.colors.blue01};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 24px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  ${({ theme }) => theme.fonts.heading3};
  color: ${({ theme }) => theme.colors.gray07};
`;

export const Input = styled.input`
  border-radius: 10px;
  border: 1.496px solid ${({ theme }) => theme.colors.gray03};
  background: ${({ theme }) => theme.colors.gray02};
  padding: 12px 16px;
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray06};
`;

export const SelectWrapper = styled.div`
  position: relative;
`;

export const SelectButton = styled.button<{ $placeholder: boolean }>`
  width: 100%;
  border-radius: 10px;
  border: 1.496px solid ${({ theme }) => theme.colors.gray03};
  background: ${({ theme }) => theme.colors.gray02};
  padding: 12px 16px;
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray06};
  text-align: start;
  cursor: pointer;
`;
