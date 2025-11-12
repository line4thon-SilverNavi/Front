import { formatBytes } from "@shared/format";
import styled from "styled-components";

type FileListProps = {
  files: File[];
  onRemove?: (idx: number) => void;
};

export default function FileList({ files, onRemove }: FileListProps) {
  if (!files.length) return null;
  return (
    <Ul>
      {files.map((f, i) => (
        <Li key={`${f.name}-${f.size}-${i}`}>
          <div className="meta">
            <strong className="name">{f.name}</strong>
            <span className="size">{formatBytes(f.size)}</span>
          </div>
          {onRemove && (
            <button
              type="button"
              className="remove"
              aria-label={`${f.name} 삭제`}
              onClick={() => onRemove(i)}
            >
              삭제
            </button>
          )}
        </Li>
      ))}
    </Ul>
  );
}

const Ul = styled.ul`
  margin-top: 10px;
  display: grid;
  gap: 8px;
`;
const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray02};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.gray01};

  .meta {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .name {
    ${({ theme }) => theme.fonts.body2};
    color: ${({ theme }) => theme.colors.gray07};
  }
  .size {
    ${({ theme }) => theme.fonts.caption};
    color: ${({ theme }) => theme.colors.gray04};
  }
  .remove {
    ${({ theme }) => theme.fonts.caption};
    color: ${({ theme }) => theme.colors.gray06};
    border: 0;
    background: transparent;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.colors.alert};
      text-decoration: underline;
    }
  }
`;
