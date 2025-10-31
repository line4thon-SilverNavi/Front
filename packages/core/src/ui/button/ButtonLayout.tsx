import styled from "styled-components";

export type ButtonLayoutType = "single" | "stack" | "row";

interface ButtonLayoutProps {
  type?: ButtonLayoutType;
  gap?: number;
  children: React.ReactNode;
}

export const ButtonLayout = ({
  type = "single",
  gap = 12,
  children,
}: ButtonLayoutProps) => {
  return (
    <Wrapper $type={type} $gap={gap}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $type: ButtonLayoutType; $gap: number }>`
  display: flex;
  width: 100%;
  gap: ${({ $gap }) => `${$gap}px`};

  ${({ $type }) => {
    switch ($type) {
      case "stack":
        return `
          flex-direction: column;
          & > * { width: 100%; }
        `;
      case "row":
        return `
          flex-direction: row;
          & > * { flex: 1; }
        `;
      case "single":
      default:
        return `
          flex-direction: column;
          & > * { width: 100%; }
        `;
    }
  }}
`;
