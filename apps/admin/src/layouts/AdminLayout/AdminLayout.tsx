import { useEffect, useState } from "react";
import { Shell, Main, ContentContainer, TitleContainer } from "./styles";
import type { AdminNavKey } from "@constants/admin-nav";
import Sidebar from "@components/layout/Sidebar/Sidebar";
import Topbar from "@components/layout/Topbar/Topbar";

type AdminLayoutProps = {
  activeKey: AdminNavKey;
  onNavigate: (key: AdminNavKey) => void;
  right?: React.ReactNode;
  children: React.ReactNode;
  title: string;
  des: string;
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
          right={right}
        />

        <ContentContainer id="main-content" role="main" tabIndex={-1}>
          <TitleContainer>
            <p className="title">{title}</p>
            <p className="des">{des}</p>
          </TitleContainer>
          {children}
        </ContentContainer>
      </Main>
    </Shell>
  );
}
