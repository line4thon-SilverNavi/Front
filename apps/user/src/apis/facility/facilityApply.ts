import { postResponse } from "@core/api/instance";

//시설 상담
export type FacilityApplyRequest = {
    facilityId: string;
    name: string;
    phone: string;
    relationRole: string;
    hopeDate: string; // Date에서 string으로 변경
    hopeTime: string;
    consultType: string;
    content: string;
};

export type FacilityApplyResponse = {
    isSuccess: boolean;
    message: string;
};

export async function postFacilityApply(body: FacilityApplyRequest) {
    return await postResponse<FacilityApplyRequest, FacilityApplyResponse>(
        "/api/consults",
        body
    );
}

//일반상담
export type GeneralApplyRequest = {
    facilityId: string;
    name: string;
    phone: string;
    inquiryType: string;
    content: string;
};

export type GeneralApplyResponse = {
    isSuccess: boolean;
    message: string;
};

export async function postGeneralApply(body: GeneralApplyRequest) {
    return await postResponse<GeneralApplyRequest, GeneralApplyResponse>(
        "/api/consults/general",
        body
    );
}


