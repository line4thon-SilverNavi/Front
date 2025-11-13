import { useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";

export type ProgramCategory = "건강" | "문화" | "치료";
export type CategoryFilter = ProgramCategory | "전체";

type Props = {
  /** 전체/건강/문화/치료 */
  category: CategoryFilter;
  onCategoryChange: (c: CategoryFilter) => void;

  /** 검색어 (외부 상태와 동기) */
  query: string;
  onQueryChange: (q: string) => void;

  /** 엔터 또는 디바운스 타이밍에 호출 (선택) */
  onSubmit?: (q: string) => void;

  /** 디바운스(ms). 기본 300 */
  debounceMs?: number;

  /** placeholder 커스텀 */
  placeholder?: string;

  /** 오른쪽에 추가 컨트롤을 넣고 싶을 때 */
  rightAddon?: React.ReactNode;
};

const CATS: CategoryFilter[] = ["전체", "건강", "문화", "치료"];

export default function ProgramSearchBar({
  category,
  onCategoryChange,
  query,
  onQueryChange,
  onSubmit,
  debounceMs = 300,
  placeholder = "프로그램 검색…",
  rightAddon,
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

  const cats = useMemo(() => CATS, []);

  return (
    <Bar role="search" aria-label="프로그램 검색 및 카테고리 필터">
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
          aria-label="프로그램 검색"
        />
      </Left>

      <Right>
        {cats.map((c) => (
          <Chip
            key={c}
            type="button"
            aria-pressed={category === c}
            $active={category === c}
            onClick={() => onCategoryChange(c)}
          >
            {c}
          </Chip>
        ))}
        {rightAddon ? <Addon>{rightAddon}</Addon> : null}
      </Right>
    </Bar>
  );
}

/* ---------------- styles ---------------- */
export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 78px;
  padding: 16px;
  border: 0.636px solid ${({ theme }) => theme.colors.gray03};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray01};
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 1 auto;
  min-width: 0;
  height: 44.981px;
  padding: 0 15.99px;
  border-radius: 10px;
  ${({ theme }) => theme.fonts.body3};
  background-color: #f5f5f5;
`;

export const SearchIcon = styled.svg`
  width: 18px;
  height: 18px;
  color: #64748b;
  flex: 0 0 auto;
`;

export const Input = styled.input`
  border: 0;
  outline: 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.gray07};
  background-color: #f5f5f5;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray07};
  }
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
`;

export const Chip = styled.button<{ $active?: boolean }>`
  appearance: none;
  border: 1px solid #e2e8f0;
  background: #f5f5f5;
  color: ${({ theme }) => theme.colors.gray06};
  padding: 12px 15px;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fonts.body3};
  cursor: pointer;

  ${({ $active }) =>
    $active &&
    css`
      background: ${({ theme }) => theme.colors.blue01};
      color: ${({ theme }) => theme.colors.gray01};
    `}
`;

export const Addon = styled.div`
  margin-left: 4px;
`;
