import styled from "styled-components";

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
  flex: 1 1 auto;
  overflow: auto;
  padding-bottom: calc(30px + env(safe-area-inset-bottom, 0px));
`;

export const DetailContent = styled.div`
  padding: 24px 50px;
  flex: 1 1 auto;
  overflow: auto;
  padding-bottom: calc(30px + env(safe-area-inset-bottom, 0px));
`;

export const BtnBar = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 2;
  flex: 0 0 auto;
  background-color: ${({ theme }) => theme.colors.gray01};
  border-top: 0.636px solid ${({ theme }) => theme.colors.gray04};
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray04};
  padding: 18px 24px;

  .attendDes {
    ${({ theme }) => theme.fonts.title1};
    color: ${({ theme }) => theme.colors.gray04};
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray04};
  padding: 18px 24px;
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5.49px;
`;

export const NoticeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.blue02};
  background-color: ${({ theme }) => theme.colors.blue03};
  padding: 15px;
  margin-top: 14px;

  img {
    display: block;
    align-self: flex-start;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    margin-right: 10px;
  }
`;

export const NoticeContainer = styled.div`
  display: flex;
`;

export const NoticeText = styled.div`
  p {
    color: ${({ theme }) => theme.colors.blue01};
    ${({ theme }) => theme.fonts.heading3};
  }

  .noticeDes {
    color: ${({ theme }) => theme.colors.gray05};
    ${({ theme }) => theme.fonts.body3};
  }

  .blue {
    color: ${({ theme }) => theme.colors.blue01};
    ${({ theme }) => theme.fonts.title3};
  }
`;

export const AttendancyCurrent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  padding: 15px;
  margin-top: 14px;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.gray02};
  border-radius: 12px;
`;

export const SummaryBox = styled.div``;

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
  color: #6b7280;
`;

export const Error = styled.div`
  color: ${({ theme }) => theme.colors.signal};
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

export const RowGap8 = styled.div`
  margin-top: 8px;
`;

export const UploadSectionTitle = styled.h3`
  ${({ theme }) => theme.fonts.heading3};
  color: ${({ theme }) => theme.colors.gray07};
  margin: 24px 0 8px;
`;
