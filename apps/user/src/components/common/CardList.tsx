import styled from "styled-components";

interface CardListProps<T> {
  items: T[];
  renderCard: (item: T) => React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  gap?: string;
}

export default function CardList<T>({ 
  items, 
  renderCard, 
  direction = 'horizontal',
  gap
}: CardListProps<T>) {
  return (
    <Container $direction={direction} $gap={gap}>
      {items.map((item) => renderCard(item))}
    </Container>
  );
}

const Container = styled.div<{ $direction: 'horizontal' | 'vertical'; $gap?: string }>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction === 'vertical' ? 'column' : 'row'};
  gap: ${({ $gap, $direction }) => $gap || ($direction === 'vertical' ? '1.5rem' : '1rem')};
  
  ${({ $direction }) => $direction === 'horizontal' && `
    overflow-x: auto;
    
    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    > * {
      flex: 0 0 270px; /* 카드 너비 고정 */
      scroll-snap-align: start;
    }
  `}
`;
