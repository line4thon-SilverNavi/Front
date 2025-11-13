import styled from "styled-components";
import type { ProgramApplicant } from "@apis/program/getApplication";
import checkImg from "/img/program/check.svg";
import noCheckImg from "/img/program/noCheck.svg";
import { fmtPhone } from "@hooks/useFmtPhone";

export type ApplicantListProps = {
  items: ProgramApplicant[];
  onToggle: (id: number) => void;
};

export default function ApplicantList({ items, onToggle }: ApplicantListProps) {
  return (
    <List role="list">
      {items.map((a) => (
        <ApplicantItem
          key={a.applicantId}
          item={a}
          onToggle={() => onToggle(a.applicantId)}
        />
      ))}
    </List>
  );
}

function ApplicantItem({
  item,
  onToggle,
}: {
  item: ProgramApplicant;
  onToggle: () => void;
}) {
  const { name, gender, age, careName, phone, attendanceStatus } = item;
  const checked = attendanceStatus === "출석";

  return (
    <Item role="listitem" $checked={checked} onClick={onToggle}>
      <CheckButton aria-pressed={checked} $checked={checked}>
        <img
          src={checked ? checkImg : noCheckImg}
          alt={checked ? "출석됨" : "미출석"}
        />
      </CheckButton>

      <Main>
        <TopLine>
          <Name>{name}</Name>
          <Meta>
            ({gender === "male" ? "남" : "여"}, {age}세)
          </Meta>
          {careName && <Chip>대리인 신청</Chip>}
        </TopLine>

        {careName && (
          <SubLine>
            <img src="/img/program/care.svg" />
            대리인: {careName}
          </SubLine>
        )}
        <SubLine>
          <img src="/img/program/phone.svg" />
          연락처: {fmtPhone(phone)}
        </SubLine>
      </Main>

      <Badge>승인됨</Badge>
    </Item>
  );
}

/* ---------- styled ---------- */
const List = styled.div`
  display: grid;
  gap: 12px;
`;

const Item = styled.div<{ $checked: boolean }>`
  display: grid;
  grid-template-columns: 36px 1fr auto;
  align-items: center;
  padding: 17px;
  border: 1.496px solid #f0f0f0;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray01};
  outline: none;
  background: ${({ $checked, theme }) =>
    $checked ? `${theme.colors.blue03}` : `${theme.colors.gray01}`};

  border: ${({ $checked, theme }) =>
    $checked
      ? `1.496px solid ${theme.colors.blue01}`
      : `1.496px solid #F0F0F0`};

  cursor: pointer;
`;

const CheckButton = styled.button<{ $checked: boolean }>`
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  & > img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const Main = styled.div`
  display: grid;
  gap: 6px;
`;

const TopLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const Name = styled.span`
  ${({ theme }) => theme.fonts.title1};
  color: ${({ theme }) => theme.colors.gray07};
`;

const Meta = styled.span`
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.gray06};
`;

const Chip = styled.span`
  font-size: 11px;
  font-weight: 500;
  background: ${({ theme }) => theme.colors.blue02};
  color: ${({ theme }) => theme.colors.blue01};
  padding: 2px 7px;
  border-radius: 4px;
`;

const SubLine = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray06};
  display: flex;
  gap: 6px;
  align-items: center;
`;

const Badge = styled.span`
  font-size: 13px;
  font-weight: 500;
  background: ${({ theme }) => theme.colors.blue02};
  color: ${({ theme }) => theme.colors.blue01};
  padding: 4px 11px;
  border-radius: 25100200px;
`;
