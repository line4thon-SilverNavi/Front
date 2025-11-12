// 프로그램명, 카테고리, 강사명
import InputContainer from "@core/components/inputContainer";
import CategoryModal from "../fields/CategoryModal";
import { type ProgramCategory } from "@apis/program/createProgram";
import * as S from "../modal.styles";

type CategoryValue = "" | ProgramCategory;

type Props = {
  // 프로그램명
  name: string;
  setName: (v: string) => void;

  // 강사명
  instructorName: string;
  setInstructorName: (v: string) => void;

  // 카테고리
  category: CategoryValue;
  catOpen: boolean;
  setCatOpen: (b: boolean) => void;
  categories: ProgramCategory[];
  onSelectCategory: (v: ProgramCategory) => void;
};

export default function BasicFields({
  name,
  setName,
  instructorName,
  setInstructorName,
  category,
  catOpen,
  setCatOpen,
  categories,
  onSelectCategory,
}: Props) {
  return (
    <>
      {/* 프로그램명 */}
      <InputContainer
        label="프로그램명"
        required
        placeholder="프로그램 이름을 입력하세요"
        value={name}
        onChange={setName}
        labelTypo="heading3"
        inputTypo="body2"
        variant="filled"
        labelColor="#1A1A1A"
      />

      <S.Grid2>
        {/* 카테고리 */}
        <div
          style={{ position: "relative" }}
          role="button"
          tabIndex={0}
          aria-haspopup="dialog"
          aria-expanded={catOpen}
          onClick={() => setCatOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setCatOpen(true);
          }}
        >
          <InputContainer
            label="카테고리"
            required
            value={category}
            onChange={() => {}}
            placeholder="건강"
            variant="filled"
            clickable
            onClickInput={() => setCatOpen(true)}
            labelColor="#1A1A1A"
            labelTypo="heading3"
            inputTypo="body2"
          />

          <CategoryModal
            open={catOpen}
            value={category}
            options={categories}
            onSelect={(v) => {
              onSelectCategory(v);
              setCatOpen(false);
            }}
            onClose={() => setCatOpen(false)}
          />
        </div>

        {/* 강사명 */}
        <InputContainer
          label="강사명"
          placeholder="강사 이름"
          value={instructorName}
          onChange={setInstructorName}
          variant="filled"
          labelColor="#1A1A1A"
          labelTypo="heading3"
          inputTypo="body2"
        />
      </S.Grid2>
    </>
  );
}
