import { useId } from "react";

import {
  Aside,
  AsideHeader,
  Brand,
  CloseBtn,
  Nav,
  NavBtn,
  AsideFooter,
  SmallLink,
  PlanContainer,
  Upgrade,
} from "./styles";
import { ADMIN_NAV_ITEMS, type AdminNavKey } from "@constants/admin-nav";

export type SidebarProps = {
  open: boolean;
  floating: boolean;
  activeKey: AdminNavKey;
  onClose: () => void;
  onSelect: (key: AdminNavKey) => void;
  facilityName?: string;
};

export default function Sidebar({
  open,
  floating,
  activeKey,
  onClose,
  onSelect,
  facilityName = "정릉주간보호센터",
}: SidebarProps) {
  const asideId = useId();

  return (
    <Aside
      id={asideId}
      aria-label="사이드바 내비게이션"
      aria-hidden={floating ? !open : false}
      data-open={open}
      data-floating={floating}
    >
      <AsideHeader>
        <Brand>
          <span className="name">{facilityName}</span>
          <p>시설 관리자 시스템</p>
        </Brand>
        <CloseBtn onClick={onClose} aria-label="사이드바 닫기" title="닫기">
          ×
        </CloseBtn>
      </AsideHeader>

      <Nav>
        <PlanContainer>
          <div className="left">
            <img src="/img/sidebar/plan.svg" />
            <p>무료 플랜</p>
          </div>
          <Upgrade>업그레이드</Upgrade>
        </PlanContainer>
        {ADMIN_NAV_ITEMS.map(({ key, label, icon, badge }) => {
          const active = key === activeKey;
          return (
            <NavBtn
              key={key}
              data-active={active}
              onClick={() => onSelect(key)}
              style={{ ["--icon" as any]: `url(${icon})` }}
            >
              <div className="left">
                <i aria-hidden className="icon" />
                <span>{label}</span>
              </div>
              {badge && <span className="badge">{badge}</span>}
            </NavBtn>
          );
        })}
      </Nav>

      <AsideFooter onClick={() => onSelect("logout")}>
        <img src="/img/sidebar/logout.png" />
        <SmallLink>로그아웃</SmallLink>
      </AsideFooter>
    </Aside>
  );
}
