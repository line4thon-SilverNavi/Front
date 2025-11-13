// 장소, 정원
import InputContainer from "@core/components/inputContainer";
import * as S from "../modal.styles";

type Props = {
  location: string;
  setLocation: (v: string) => void;
  capacity: number | ""; // 빈칸 허용
  setCapacity: (v: number | "") => void;
};

export default function LocationCapacityFields({
  location,
  setLocation,
  capacity,
  setCapacity,
}: Props) {
  const onChangeCapacity = (v: string) => {
    if (v === "") return setCapacity("");
    const n = Number(v);
    if (Number.isNaN(n)) return setCapacity("");
    setCapacity(Math.max(1, n)); // 최소 1 보정
  };

  return (
    <S.Grid2>
      <InputContainer
        label="장소"
        placeholder="장소를 입력하세요"
        value={location}
        onChange={setLocation}
        variant="filled"
        prefixIcon={<img src="/img/program/location.svg" alt="" aria-hidden />}
        labelColor="#1A1A1A"
        labelTypo="heading3"
        inputTypo="body2"
      />

      <InputContainer
        label="정원"
        type="number"
        placeholder="20"
        value={capacity === "" ? "" : String(capacity)}
        onChange={onChangeCapacity}
        inputMode="numeric"
        variant="filled"
        prefixIcon={<img src="/img/program/people.svg" alt="" aria-hidden />}
        labelColor="#1A1A1A"
        labelTypo="heading3"
        inputTypo="body2"
      />
    </S.Grid2>
  );
}
