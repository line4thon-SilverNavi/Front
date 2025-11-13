import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bar,
  Left,
  Addon,
  Chip,
  Right,
  Input,
  SearchIcon,
} from "../program/ProgramSearchBar";

export type StatusFilter =
  | "전체"
  | "대기중"
  | "승인"
  | "거부"
  | "확인됨"
  | "완료";

type Props = {
  status: StatusFilter;
  onStatusChange: (s: StatusFilter) => void;

  query: string;
  onQueryChange: (q: string) => void;

  onSubmit?: (q: string) => void;
  debounceMs?: number;
  placeholder?: string;
  rightAddon?: React.ReactNode;

  statusOptions?: StatusFilter[];
};

const DEFAULT_STATUSES: StatusFilter[] = ["전체", "대기중", "승인", "거부"];

export default function RequestSearchBar({
  status,
  onStatusChange,
  query,
  onQueryChange,
  onSubmit,
  debounceMs = 300,
  placeholder = "프로그램 검색...",
  rightAddon,
  statusOptions,
}: Props) {
  const [local, setLocal] = useState(query);
  const tRef = useRef<number | null>(null);

  const submitRef = useRef<Props["onSubmit"] | null>(null);
  useEffect(() => {
    submitRef.current = onSubmit;
  }, [onSubmit]);

  useEffect(() => {
    if (local !== query) setLocal(query);
  }, [query]);

  useEffect(() => {
    if (!submitRef.current) return;
    if (tRef.current) window.clearTimeout(tRef.current);
    tRef.current = window.setTimeout(() => {
      submitRef.current?.(local.trim());
    }, debounceMs);
    return () => {
      if (tRef.current) window.clearTimeout(tRef.current);
    };
  }, [local, debounceMs]);

  const chips = useMemo(
    () => statusOptions ?? DEFAULT_STATUSES,
    [statusOptions]
  );

  return (
    <Bar role="search" aria-label="신청 검색 및 상태 필터">
      <Left>
        <SearchIcon aria-hidden viewBox="0 0 24 24">
          <path
            d="M21 21l-4.2-4.2m1.2-4.8a7 7 0 11-14 0 7 7 0 0114 0z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SearchIcon>
        <Input
          value={local}
          onChange={(e) => {
            setLocal(e.target.value);
            onQueryChange(e.target.value);
          }}
          placeholder={placeholder}
          aria-label="검색"
        />
      </Left>

      <Right>
        {chips.map((c) => (
          <Chip
            key={c}
            type="button"
            aria-pressed={status === c}
            $active={status === c}
            onClick={() => onStatusChange(c)}
          >
            {c}
          </Chip>
        ))}
        {rightAddon ? <Addon>{rightAddon}</Addon> : null}
      </Right>
    </Bar>
  );
}
