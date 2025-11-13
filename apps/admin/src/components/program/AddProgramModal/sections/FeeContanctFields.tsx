//참가비, 문의전화

import InputContainer from "@core/components/inputContainer";
import * as S from "../modal.styles";

type Props = {
  fee: string;
  setFee: (v: string) => void;
  number: string;
  setNumber: (v: string) => void;
};

export default function FeeContactFields({
  fee,
  setFee,
  number,
  setNumber,
}: Props) {
  return (
    <S.Grid2>
      <InputContainer
        label="참가비"
        placeholder="예: 무료 / 5,000원"
        value={fee}
        onChange={setFee}
        variant="filled"
        prefixIcon={<img src="/img/program/cost.svg" alt="" aria-hidden />}
        labelColor="#1A1A1A"
        labelTypo="heading3"
        inputTypo="body2"
      />

      <InputContainer
        label="문의 전화"
        type="tel"
        placeholder="010-1234-5678"
        value={number}
        onChange={setNumber}
        autoComplete="tel"
        inputMode="numeric"
        variant="filled"
        labelColor="#1A1A1A"
        labelTypo="heading3"
        inputTypo="body2"
      />
    </S.Grid2>
  );
}
