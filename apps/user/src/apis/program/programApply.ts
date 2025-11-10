import { postResponse } from "@core/api/instance";

export type ProgramApplyRequest = {
    content: string;
};

export type ProgramApplyResponse = {
    isSuccess: boolean;
    message: string;
};

export async function postProgramApply(programId: number, body: ProgramApplyRequest) {
    return await postResponse<ProgramApplyRequest, ProgramApplyResponse>(
        `/api/programs/${programId}/apply`,
        body
    );
}



