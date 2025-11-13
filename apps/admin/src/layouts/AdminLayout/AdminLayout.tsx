import { useEffect, useState } from "react";
import { Shell, Main, ContentContainer, TitleContainer } from "./styles";
import type { AdminNavKey } from "@constants/admin-nav";
import Sidebar from "@components/layout/Sidebar/Sidebar";
import Topbar from "@components/layout/Topbar/Topbar";
import styled from "styled-components";

type AdminLayoutProps = {
  activeKey: AdminNavKey;
  onNavigate: (key: AdminNavKey) => void;
  right?: React.ReactNode;
  children: React.ReactNode;
  title: React.ReactNode;
  des: React.ReactNode;
};

export default function AdminLayout({
  activeKey,
  onNavigate,
  right,
  children,
  title,
  des,
}: AdminLayoutProps) {
  const [open, setOpen] = useState(true);
  const [floating] = useState(false);
  const [facilityName, setFacilityName] = useState<string>("");

  useEffect(() => {
    const init = () => {
      const n = localStorage.getItem("name") ?? "";
      setFacilityName(n);
    };
    init();

    const onStorage = (e: StorageEvent) => {
      if (e.key === "name") setFacilityName(e.newValue ?? "");
    };
    window.addEventListener("storage", onStorage);

    const onAuthUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail as { name?: string };
      if (detail?.name !== undefined) setFacilityName(detail.name ?? "");
    };
    window.addEventListener("auth:update", onAuthUpdate);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth:update", onAuthUpdate);
    };
  }, []);

  return (
    <Shell data-open={open} data-floating={floating}>
      <Sidebar
        open={open}
        floating={floating}
        activeKey={activeKey}
        onClose={() => setOpen(false)}
        onSelect={(key) => {
          if (key === "logout") return onNavigate("logout");
          onNavigate(key);
          if (floating) setOpen(false);
        }}
        facilityName={facilityName || "시설명"}
      />

      <Main>
        <Topbar
          name={facilityName || "시설명"}
          sidebarOpen={open}
          onToggleSidebar={() => setOpen((v) => !v)}
          right={"시설 관리자"}
        />

        <ContentContainer id="main-content" role="main" tabIndex={-1}>
          <HeaderRow>
            <TitleContainer>
              <div className="title">{title}</div>
              <div className="des">{des}</div>
            </TitleContainer>

            {right && <RightBox>{right}</RightBox>}
          </HeaderRow>

          {children}
        </ContentContainer>
      </Main>
    </Shell>
  );
}

/* ---------- styles ---------- */
const HeaderRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }
`;

const RightBox = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
