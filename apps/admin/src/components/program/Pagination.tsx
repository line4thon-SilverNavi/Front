// src/components/common/Pagination.tsx
import styled from "styled-components";

type Props = {
  page: number;
  totalPages: number;
  onChange: (next: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
  const prev = () => onChange(Math.max(1, page - 1));
  const next = () => onChange(Math.min(totalPages, page + 1));
  return (
    <Wrap>
      <button disabled={page <= 1} onClick={prev}>
        이전
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button disabled={page >= totalPages} onClick={next}>
        다음
      </button>
    </Wrap>
  );
}
const Wrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
  margin-top: 12px;
  & > button {
    padding: 6px 10px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #fff;
  }
  & > span {
    color: #475569;
    font-weight: 600;
  }
`;
