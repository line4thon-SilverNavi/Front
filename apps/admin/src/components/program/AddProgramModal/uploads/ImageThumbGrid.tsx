import styled from "styled-components";

type Props = {
  files: File[];
  onRemove: (idx: number) => void;
};

export default function ImageThumbGrid({ files, onRemove }: Props) {
  if (!files.length) return null;
  return (
    <Grid role="list">
      {files.map((f, i) => {
        const src = URL.createObjectURL(f);
        return (
          <Item key={`${f.name}-${f.size}-${i}`} role="listitem">
            <img src={src} />
            <button
              type="button"
              aria-label={`${f.name} 삭제`}
              onClick={() => onRemove(i)}
              className="del"
            >
              ×
            </button>
          </Item>
        );
      })}
    </Grid>
  );
}

const Grid = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  gap: 10px;
`;
const Item = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.gray02};
  background: ${({ theme }) => theme.colors.gray01};
  aspect-ratio: 1/1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .del {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 0;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.gray05};
    color: ${({ theme }) => theme.colors.gray01};
    line-height: 24px;
  }
`;
