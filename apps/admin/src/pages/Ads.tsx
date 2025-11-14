import { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";

import { patchAds } from "@apis/Ads/patchAds";
import BasicSection from "@components/Ads/BasicSection";
import ContactSection from "@components/Ads/ContactSection";
import DescriptionSection from "@components/Ads/DescriptionSection";
import ImagesSection from "@components/Ads/ImageSection";
import ServiceSection from "@components/Ads/ServiceSection";
import type { AdsDetail, Category, PatchAdsPayload } from "@apis/Ads/types";
import { getAdsDetail } from "@apis/Ads/getAds";

const Ads = () => {
  const [initial, setInitial] = useState<AdsDetail | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [operatingHours, setOperatingHours] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAdsDetail();
        setInitial(data);

        setName(data.name ?? "");
        setCategory(data.category);
        setOperatingHours(data.operatingHours ?? "");
        setNumber(data.number ?? "");
        setAddress(data.address ?? "");
        setDescription(data.description ?? "");
        setServices(data.mainServices ?? []);
        setExistingImageUrls(data.images ?? []);
      } catch (e: any) {
        console.error(e);
        toast.error(e?.message || "시설 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    if (!initial) return;
    setSaving(true);

    const payload: PatchAdsPayload = {
      // name: null이면 유지, 문자열이면 변경
      name: name === initial.name ? null : name.trim(),

      category: category === initial.category ? null : category,

      // 운영시간 / 번호 / 설명은 "" 보내면 제거
      operatingHours:
        operatingHours === initial.operatingHours
          ? null
          : operatingHours.trim() === "" && initial.operatingHours !== null
            ? ""
            : operatingHours.trim(),

      number:
        number === initial.number
          ? null
          : number.trim() === "" && initial.number !== null
            ? ""
            : number.trim(),

      // address는 제거 개념이 없고, 변경되면 값, 아니면 null
      address: address === initial.address ? null : address.trim(),

      description:
        description === initial.description
          ? null
          : description.trim() === "" && initial.description !== null
            ? ""
            : description.trim(),

      // mainServices: null이면 유지, []면 제거
      mainServices:
        JSON.stringify(services) === JSON.stringify(initial.mainServices ?? [])
          ? null
          : services.length === 0
            ? []
            : services,

      newImages: newImages.length ? newImages : null,
      existingImageUrls: existingImageUrls,
    };

    try {
      const updated = await patchAds(payload);
      // 응답으로 폼 동기화
      setInitial(updated);
      setName(updated.name ?? "");
      setCategory(updated.category ?? null);
      setOperatingHours(updated.operatingHours ?? "");
      setNumber(updated.number ?? "");
      setAddress(updated.address ?? "");
      setDescription(updated.description ?? "");
      setServices(updated.mainServices ?? []);
      setExistingImageUrls(updated.images ?? []);
      setNewImages([]);
      toast.success("시설 홍보 정보가 저장되었습니다.");
      setSaving(true);
    } catch (e: any) {
      toast.error(e?.message || "시설 정보 저장에 실패했습니다.");
    }
  };

  if (loading) return <div>불러오는 중...</div>;

  return (
    <PageWrapper>
      <NoticeContainer>
        <img src="/img/program/notice.svg" />
        <NoticeText>
          <p>참고해보세요!</p>
          <p className="noticeDes">
            여기서 수정한 정보는 사용자가 시설 상세 페이지에서 확인할 수
            있습니다. 정확하고 매력적인 정보를 입력하여 더 많은 사용자의 관심을
            받아보세요!
          </p>
        </NoticeText>
      </NoticeContainer>

      <SectionWrapper>
        <BasicSection
          name={name}
          onNameChange={setName}
          category={category}
          onCategoryChange={setCategory}
        />
      </SectionWrapper>

      <SectionWrapper>
        <ContactSection
          operatingHours={operatingHours}
          onOperatingHoursChange={setOperatingHours}
          number={number}
          onNumberChange={setNumber}
          address={address}
          onAddressChange={setAddress}
        />
      </SectionWrapper>

      <SectionWrapper>
        <DescriptionSection
          description={description}
          onDescriptionChange={setDescription}
        />
      </SectionWrapper>

      <SectionWrapper>
        <ServiceSection services={services} onChange={setServices} />
      </SectionWrapper>

      <SectionWrapper>
        <ImagesSection
          existingImageUrls={existingImageUrls}
          onExistingChange={setExistingImageUrls}
          newImages={newImages}
          onNewImagesChange={setNewImages}
        />
      </SectionWrapper>

      <SubmitBar>
        <SaveButton type="button" disabled={saving} onClick={handleSubmit}>
          저장하기
        </SaveButton>
      </SubmitBar>
    </PageWrapper>
  );
};

export default Ads;

/* ---------- styles ---------- */

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const NoticeContainer = styled.div`
  display: flex;
  gap: 10px;
  border-radius: 10px;
  padding: 16px 20px;
  background: ${({ theme }) => theme.colors.gray01};
  border: 1px solid ${({ theme }) => theme.colors.blue01};
  align-items: flex-start;

  img {
    width: 24px;
  }
`;

export const NoticeText = styled.div`
  p {
    color: ${({ theme }) => theme.colors.blue01};
    ${({ theme }) => theme.fonts.heading3};
  }

  .noticeDes {
    color: ${({ theme }) => theme.colors.gray05};
    ${({ theme }) => theme.fonts.body3};
  }
`;

const SectionWrapper = styled.section`
  border-radius: 16px;
  border: 0.748px solid ${({ theme }) => theme.colors.gray03};
  background: ${({ theme }) => theme.colors.gray01};
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SubmitBar = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
`;

const SaveButton = styled.button`
  padding: 10px 18px;
  border-radius: 15px;
  cursor: pointer;
  ${({ theme }) => theme.fonts.heading3};
  background: ${({ theme }) => theme.colors.blue01};
  color: ${({ theme }) => theme.colors.gray01};
  display: flex;
  width: 136px;
  padding: 20px 30px;
  justify-content: center;
  align-items: center;
`;
