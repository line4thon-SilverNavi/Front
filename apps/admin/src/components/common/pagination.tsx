import styled from "styled-components";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
  className?: string;
};

export default function Pagination({
  totalPages,
  currentPage,
  onChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => {
    if (currentPage > 1) onChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onChange(currentPage + 1);
  };

  return (
    <Wrap className={className} role="navigation">
      <ArrowButton
        type="button"
        disabled={currentPage === 1}
        onClick={handlePrev}
      >
        {"<"}
      </ArrowButton>

      {pages.map((page) => (
        <PageButton
          key={page}
          type="button"
          $active={page === currentPage}
          onClick={() => onChange(page)}
        >
          {page}
        </PageButton>
      ))}

      <ArrowButton
        type="button"
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        {">"}
      </ArrowButton>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
`;

const ArrowButton = styled.button`
  border: none;
  background: none;
  padding: 4px 6px;
  cursor: pointer;

  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray05};

  &:disabled {
    cursor: default;
    opacity: 0.4;
  }
`;

const PageButton = styled.button<{ $active: boolean }>`
  min-width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;

  ${({ $active, theme }) =>
    $active
      ? `
    background: ${theme.colors.blue01};
    color: ${theme.colors.gray01};
    font-weight: "700"
  `
      : `
    background: transparent;
    color: ${theme.colors.gray05};
  `}
`;
