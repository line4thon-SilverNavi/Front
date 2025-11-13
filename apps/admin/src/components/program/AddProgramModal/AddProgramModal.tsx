import { Button, ButtonLayout } from "@core/ui/button";
import * as S from "./modal.styles";
import { Field } from "./FormControls";

import BasicFields from "./sections/BasicFields";
import ScheduleFields from "./sections/ScheduleFields";
import LocationCapacityFields from "./sections/LocationCapacityFields";

import { useAddProgramForm } from "./useAddProgramForm";
import FeeContactFields from "./sections/FeeContanctFields";
import DesSupplyFields from "./sections/DesSupplyFields";
import FileFields from "./sections/FileFields";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: (newId: number) => void;
  facilityName?: string;
};

export default function AddProgramModal({
  open,
  onClose,
  onSuccess,
  facilityName,
}: Props) {
  const f = useAddProgramForm(facilityName);

  useEffect(() => {
    if (open) f.reset();
  }, [open, facilityName]);

  if (!open) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <S.Backdrop role="dialog" aria-modal="true" onClick={handleClose}>
      <S.Sheet onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.H2>새 프로그램 추가</S.H2>
          <S.Close
            onClick={handleClose}
            aria-label="닫기"
            src="/img/close.svg"
          />
        </S.Header>

        <S.Content>
          <S.Notice>
            <img src="/img/program/addprogram.svg" alt="" />
            <div className="right">
              <p>프로그램 등록 안내</p>
              <p className="des">
                프로그램 기획서(PDF)와 관련 사진을 업로드해주세요. <br />
                상세한 정보는 더 높은 참가율로 이어집니다.
              </p>
            </div>
          </S.Notice>

          <S.Form>
            <BasicFields
              name={f.name}
              setName={f.setName}
              instructorName={f.instructorName}
              setInstructorName={f.setInstructorName}
              category={f.category}
              catOpen={f.catOpen}
              setCatOpen={f.setCatOpen}
              categories={[...f.CATS]}
              onSelectCategory={f.setCategory}
            />

            <ScheduleFields
              date={f.date}
              setDate={f.setDate}
              startTime={f.startTime}
              setStartTime={f.setStartTime}
              endTime={f.endTime}
              setEndTime={f.setEndTime}
            />

            <LocationCapacityFields
              location={f.location}
              setLocation={f.setLocation}
              capacity={f.capacity}
              setCapacity={f.setCapacity}
            />

            <FeeContactFields
              fee={f.fee}
              setFee={f.setFee}
              number={f.number}
              setNumber={f.setNumber}
            />

            <DesSupplyFields
              description={f.description}
              setDescription={f.setDescription}
              suppliesText={f.suppliesText}
              setSuppliesText={f.setSuppliesText}
            />

            <Field>
              <FileFields
                proposal={f.proposal}
                setProposal={f.setProposal}
                images={f.images}
                setImages={f.setImages}
                onPickProposal={f.onPickProposal}
                onPickImages={f.onPickImages}
                fileInputRef={f.fileInputRef}
                imgInputRef={f.imgInputRef}
              />
            </Field>
          </S.Form>
        </S.Content>

        <S.BtnBar>
          <ButtonLayout type="row" gap={12}>
            <Button
              tone="gray"
              variant="subtle"
              onClick={handleClose}
              size="lg"
              typo="heading2"
            >
              취소
            </Button>
            <Button
              onClick={() => f.submit(onSuccess, handleClose)}
              disabled={f.busy}
              aria-busy={f.busy}
              size="lg"
              typo="heading2"
            >
              {f.busy ? "추가 중" : "추가"}
            </Button>
          </ButtonLayout>
        </S.BtnBar>
      </S.Sheet>
    </S.Backdrop>
  );
}
