import {
  Left,
  Right,
  TopbarWrap,
  Burger,
  Title,
  RoleBadge,
  RightContainer,
} from "./styles";

export type TopbarProps = {
  name: string;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  right?: React.ReactNode;
};

export default function Topbar({
  name,
  sidebarOpen,
  onToggleSidebar,
  right,
}: TopbarProps) {
  return (
    <TopbarWrap role="banner">
      <Left>
        {!sidebarOpen && (
          <Burger onClick={onToggleSidebar} aria-label="사이드바 열기">
            <img src="/img/sidebar/hamburger.png" />
          </Burger>
        )}
      </Left>
      <Right>
        <RightContainer>
          <Title>{name}</Title>
          {right}
        </RightContainer>
        <RoleBadge>관</RoleBadge>
      </Right>
    </TopbarWrap>
  );
}
