import { Wrapper, SectionTitle, Field, Label, Input } from "./BasicSection";

type Props = {
  operatingHours: string;
  onOperatingHoursChange: (v: string) => void;
  number: string;
  onNumberChange: (v: string) => void;
  address: string;
  onAddressChange: (v: string) => void;
};

export default function ContactSection({
  operatingHours,
  onOperatingHoursChange,
  number,
  onNumberChange,
  address,
  onAddressChange,
}: Props) {
  return (
    <Wrapper>
      <SectionTitle>연락 정보</SectionTitle>
      <Field>
        <Label>운영시간</Label>
        <Input
          value={operatingHours}
          onChange={(e) => onOperatingHoursChange(e.target.value)}
          placeholder="예: 24시간 운영 / 연중무휴"
        />
      </Field>
      <Field>
        <Label>전화번호</Label>
        <Input
          value={number}
          onChange={(e) => onNumberChange(e.target.value)}
          placeholder="예: 0507-1335-8538"
        />
      </Field>
      <Field>
        <Label>주소</Label>
        <Input
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          placeholder="예: 서울시 성북구 정릉동 123-45"
        />
      </Field>
    </Wrapper>
  );
}
