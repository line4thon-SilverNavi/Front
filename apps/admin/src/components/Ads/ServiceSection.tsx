import { Wrapper, SectionTitle, Field, Label } from "./BasicSection";
import styled from "styled-components";
import { AddButton } from "./ImageSection";

type Props = {
  services: string[];
  onChange: (next: string[]) => void;
};

export default function ServiceSection({ services, onChange }: Props) {
  const handleAdd = () => onChange([...services, ""]);
  const handleRemove = (idx: number) =>
    onChange(services.filter((_, i) => i !== idx));
  const handleChange = (idx: number, value: string) =>
    onChange(services.map((s, i) => (i === idx ? value : s)));

  return (
    <Wrapper>
      <SectionTitle>주요 서비스</SectionTitle>
      <Field>
        <Label>서비스 항목</Label>
        <Row>
          <Input
            placeholder="서비스 항목 추가 (예: 24시간 전문 간호)"
            value={services[0] ?? ""}
            onChange={(e) => handleChange(0, e.target.value)}
          />
          <AddButton type="button" onClick={handleAdd}>
            <img src="/img/ads/plus.svg" /> 추가
          </AddButton>
        </Row>

        {services.slice(1).map((s, idx) => (
          <Row key={idx + 1}>
            <Input
              value={s}
              onChange={(e) => handleChange(idx + 1, e.target.value)}
            />
            <RemoveButton type="button" onClick={() => handleRemove(idx + 1)}>
              삭제
            </RemoveButton>
          </Row>
        ))}
      </Field>
    </Wrapper>
  );
}

const Row = styled.div`
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray03};
  padding: 12px 16px;
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray06};
  background-color: ${({ theme }) => theme.colors.gray02};

  &:focus {
    border: none;
    outline: none;
  }
`;

const RemoveButton = styled(AddButton)`
  background: #fff;
  display: flex;
  justify-content: center;
  width: 80px;
  color: ${({ theme }) => theme.colors.gray06};
  border: 1px solid ${({ theme }) => theme.colors.gray03};
`;
