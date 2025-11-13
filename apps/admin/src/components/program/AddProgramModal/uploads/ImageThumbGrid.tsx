import styled from "styled-components";

type Props = {
  files?: File[];
  urls?: string[];
  onRemoveFile?: (idx: number) => void;
  onRemoveUrl?: (url: string) => void;
};

export default function ImageThumbGrid({
  files = [],
  urls = [],
  onRemoveFile,
  onRemoveUrl,
}: Props) {
  const hasFiles = files.length > 0;
  const hasUrls = urls.length > 0;

  if (!hasFiles && !hasUrls) return null;

  return (
    <Grid role="list">
      {files.map((f, i) => {
        const src = URL.createObjectURL(f);
        return (
          <Item key={`file-${f.name}-${f.size}-${i}`} role="listitem">
            <img src={src} alt={f.name} />
            {onRemoveFile && (
              <button
                type="button"
                aria-label={`${f.name} 삭제`}
                onClick={() => onRemoveFile(i)}
                className="del"
              >
                ×
              </button>
            )}
          </Item>
        );
      })}

      {urls.map((url, i) => (
        <Item key={`url-${url}-${i}`} role="listitem">
          <img src={url} alt={`기존 이미지 ${i + 1}`} />
          {onRemoveUrl && (
            <button
              type="button"
              aria-label={`이미지 ${i + 1} 삭제`}
              onClick={() => onRemoveUrl(url)}
              className="del"
            >
              ×
            </button>
          )}
        </Item>
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
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
