// src/pages/admin/common/useAdminHeader.ts
import { useLayoutEffect } from "react";
import { useOutletContext } from "react-router-dom";

type Ctx = {
  setHeader: (o: {
    title?: React.ReactNode;
    des?: React.ReactNode;
    right?: React.ReactNode;
  }) => void;
  facilityName: string;
};

export function useAdminHeader(opts: {
  des?: React.ReactNode;
  right?: React.ReactNode;
  title?: React.ReactNode;
}) {
  const { setHeader, facilityName } = useOutletContext<Ctx>();
  useLayoutEffect(() => {
    setHeader(opts);
  }, [opts.des, opts.right, opts.title, setHeader]);
  return { facilityName };
}
