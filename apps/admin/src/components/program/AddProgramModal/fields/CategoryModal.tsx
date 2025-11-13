import { useEffect, useRef } from "react";
import styled from "styled-components";

type Props<T extends string> = {
  open: boolean;
  value: T | "";
  options: T[];
  onSelect: (v: T) => void;
  onClose: () => void;
};

export default function CategoryDropdown<T extends string>({
  open,
  value,
  options,
  onSelect,
  onClose,
}: Props<T>) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Dropdown ref={ref}>
      <Title>선택해주세요</Title>
      {options.map((opt) => (
        <Option key={opt} $active={value === opt} onClick={() => onSelect(opt)}>
          {opt}
        </Option>
      ))}
    </Dropdown>
  );
}

/* ----- style ----- */
const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 6px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  z-index: 50;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.gray03};
`;

const Title = styled.div`
  padding: 15px 10px;
  background: ${({ theme }) => theme.colors.blue03};
  color: ${({ theme }) => theme.colors.blue01};
  ${({ theme }) => theme.fonts.title3};
`;

const Option = styled.button<{ $active?: boolean }>`
  padding: 15px 10px;
  border: none;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray07};
  ${({ theme }) => theme.fonts.body3};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.blue02};
  }
`;
