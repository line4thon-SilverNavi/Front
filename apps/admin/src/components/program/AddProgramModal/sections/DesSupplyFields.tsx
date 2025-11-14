//설명, 준비물

import InputContainer from "@core/components/inputContainer";
import TextAreaContainer from "@core/components/TextAreaContainer";

type Props = {
  description: string;
  setDescription: (v: string) => void;
  suppliesText: string;
  setSuppliesText: (v: string) => void;
};

export default function DesSupplyFields({
  description,
  setDescription,
  suppliesText,
  setSuppliesText,
}: Props) {
  return (
    <>
      <TextAreaContainer
        label="프로그램 설명"
        placeholder="프로그램에 대한 설명을 입력하세요"
        value={description}
        onChange={setDescription}
        labelTypo="heading3"
        textareaTypo="body2"
        placeholderTypo="body2"
        labelColor="#1A1A1A"
        placeholderColor="#A8A8A8"
      />

      <InputContainer
        label="준비물"
        placeholder="쉼표로 구분 (예: 편한 복장, 운동화, 물)"
        value={suppliesText}
        onChange={setSuppliesText}
        variant="filled"
        labelColor="#1A1A1A"
        labelTypo="heading3"
        inputTypo="body2"
      />
    </>
  );
}
