import styled from "styled-components";

/** 레이아웃/비주얼 전용 스타일 파일 */

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Sheet = styled.div`
  width: min(720px, 92vw);
  max-height: 90vh;
  overflow: auto;
  background: #fff;
  border-radius: 16px;

  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

export const Content = styled.div`
  padding: 18px 24px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray04};
  padding: 18px 24px;
`;

export const H2 = styled.h2`
  ${({ theme }) => theme.fonts.heading1};
  color: ${({ theme }) => theme.colors.gray07};
`;

export const Close = styled.img`
  height: 20px;
  cursor: pointer;
`;

export const Notice = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0 16px;
  padding: 12px 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.blue03};
  border: 1px solid ${({ theme }) => theme.colors.blue02};
  color: ${({ theme }) => theme.colors.blue01};
  gap: 15px;

  img {
    display: block;
    align-self: flex-start;
  }

  .des {
    ${({ theme }) => theme.fonts.body3};
    color: ${({ theme }) => theme.colors.gray05};
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const Label = styled.p``;

export const Select = styled.select`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  color: #111827;
  &:focus {
    outline: none;
    border-color: #93c5fd;
    box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.35);
  }
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Span = styled.span`
  /* ${({ theme }) => theme.fonts.heading3} */
  color: #6b7280;
`;

export const Error = styled.div`
  /* ${({ theme }) => theme.fonts.heading3} */
  color: #c62828;
`;

export const ThumbList = styled.ul`
  margin-top: 8px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;

  @media (max-width: 720px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Thumb = styled.li`
  position: relative;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 1 / 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  button {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: rgba(17, 24, 39, 0.6);
    color: #fff;
    border: 0;
    cursor: pointer;
    line-height: 1;
  }
`;
