//날짜, 시간
import * as S from "../modal.styles";

import DateField from "@components/program/AddProgramModal/fields/DateField";
import TimeRangeField from "@components/program/AddProgramModal/fields/TimeField";

type Props = {
  date: string;
  setDate: (v: string) => void;
  startTime: string;
  setStartTime: (v: string) => void;
  endTime: string;
  setEndTime: (v: string) => void;
};
export default function ScheduleFields({
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}: Props) {
  return (
    <S.Grid2>
      <DateField required value={date} onChange={setDate} />
      <S.Flex>
        <TimeRangeField
          required
          startTime={startTime}
          endTime={endTime}
          onChangeStart={setStartTime}
          onChangeEnd={setEndTime}
        />
      </S.Flex>
    </S.Grid2>
  );
}
