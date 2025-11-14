import instance from "@core/api/instance";
import type { PatchAdsPayload, ApiEnvelope, AdsDetail } from "./types";

const fdAdd = (fd: FormData, key: string, val: unknown) => {
  if (val === null || val === undefined) return;
  if (Array.isArray(val)) {
    fd.append(key, JSON.stringify(val));
  } else {
    fd.append(key, String(val));
  }
};

export async function patchAds(payload: PatchAdsPayload): Promise<AdsDetail> {
  const fd = new FormData();

  fdAdd(fd, "name", payload.name);
  fdAdd(fd, "category", payload.category);
  fdAdd(fd, "operatingHours", payload.operatingHours);
  fdAdd(fd, "number", payload.number);
  fdAdd(fd, "address", payload.address);
  fdAdd(fd, "description", payload.description);

  if (payload.mainServices !== undefined && payload.mainServices !== null) {
    if (payload.mainServices.length === 0) {
      // 삭제 의도: BE에서 "빈 값이면 다 지우기"로 처리
      fd.append("mainServices", "");
    } else {
      fd.append("mainServices", payload.mainServices.join(", "));
    }
  }

  if (payload.newImages) {
    payload.newImages.forEach((file) => {
      if (file) {
        fd.append("newImages", file);
      }
    });
  }

  if (
    payload.existingImageUrls !== undefined &&
    payload.existingImageUrls !== null
  ) {
    if (payload.existingImageUrls.length === 0) {
      // 완전 삭제 의도라면, 서버 설계에 따라
      // fd.append("existingImageUrls", "");
    } else {
      payload.existingImageUrls.forEach((url) => {
        fd.append("existingImageUrls", url);
      });
    }
  }

  const res = await instance.patch<ApiEnvelope<AdsDetail>>(
    `/api/facilities`,
    fd
  );

  if (!res.data?.isSuccess) {
    throw new Error(res.data?.message || "시설 정보 변경 실패했습니다.");
  }
  return res.data.data;
}
