import { postResponse } from "@core/api/instance";

export type OcrRequest = {
    image: File;
};

export type OcrResponse = {
    isSuccess: boolean;
    timestamp: string;
    code: string;
    httpStatus: number;
    message: string;
    data: {
        careGrade: string;
    };
};

export async function postOcr(body: FormData) {
    return await postResponse<FormData, OcrResponse>(
        "/api/caretargets/ocr",
        body
    );
}



