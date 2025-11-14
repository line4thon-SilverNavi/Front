export type Category = "요양병원" | "요양원/요양센터" | "데이케어센터";

export type AdsDetail = {
  name: string | null;
  category: Category | null;
  operatingHours: string | null;
  number: string | null;
  address: string | null;
  description: string | null;
  mainServices: string[] | null;
  images: string[] | null;
};

export type PatchAdsPayload = {
  name: string | null;
  category: Category | null;
  operatingHours: string | null;
  number: string | null;
  address: string | null;
  description: string | null;
  mainServices: string[] | null;
  newImages?: File[] | null;
  existingImageUrls?: string[] | null;
};

export type ApiEnvelope<T> = {
  isSuccess: boolean;
  message: string;
  data: T;
};
