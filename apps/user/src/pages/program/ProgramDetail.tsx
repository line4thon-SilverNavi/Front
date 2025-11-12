import { Button } from "@core/ui/button";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useFormatDate, useFormatTime } from "@hooks/program/ProcessingTime";
import * as s from "@layouts/DetailPageLayout";
import { getProgramDetail, type ProgramDetailData } from "@apis/program/programDetail";
import { getProgramDetailDummy } from "@apis/dummy/programDetailDummy";
import { useEffect, useState } from "react";

export default function ProgramDetailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { programId } = useParams<{ programId: string }>();
    const [program, setProgram] = useState<ProgramDetailData | null>(null);
    
    // location.state에서 가져오기
    const cardInfo = location.state as {
        currentApplicants: number;
        capacity: number;
        dayOfWeek: string;
    } | null;
    
    useEffect(() => {
        const fetchProgramDetail = async () => {
            if (programId) {
                try {
                    console.log('API 호출 시도:', programId);
                    const data = await getProgramDetail(Number(programId));
                    console.log('API 응답:', data);
                    if (data) {
                        setProgram(data);
                    } else {
                        throw new Error('데이터가 null입니다');
                    }
                } catch (error) {
                    console.warn('실제 API 호출 실패, 더미 데이터 사용:', error);
                    const dummyData = await getProgramDetailDummy(Number(programId));
                    setProgram(dummyData);
                }
            }
        };
        fetchProgramDetail();
    }, [programId]);

    const handleApply = () => {
        navigate(`/program/${programId}/apply`, { 
            state: { 
                programId,
                programData: program 
            } 
        });
    };

    if (!program) {
        return <div>로딩 중...</div>;
    }

    const displayImage = program.images && program.images.length > 0 
        ? program.images[0] 
        : "/img/dummy/program-default.png";

    const applicationRate = cardInfo 
        ? (cardInfo.currentApplicants / cardInfo.capacity) * 100 
        : 0;

    const formattedDate = useFormatDate(program.date);
    const formattedTime = useFormatTime(program.startTime, program.endTime);

    return (
        <s.DetailPageLayout
            image={displayImage}
            category={program.category}
            bookmarkProps={{
                initialBookmarked: program.bookmarked,
                contentId: Number(programId),
                type: "프로그램",
            }}
            footer={
                <Button tone="blue" radius="pill" size="lg" fullWidth onClick={handleApply}>
                    신청하기
                </Button>
            }
        >
            <s.DetailTitle>{program.name}</s.DetailTitle>

            {cardInfo && (
                <s.Applicants>
                    <img src="/img/detail-page/applicants.png" style={{width:"16px", height:"16px"}}/>
                    <s.ApplicantText>신청 {cardInfo.currentApplicants}/{cardInfo.capacity}명</s.ApplicantText>
                    <s.ProgressBarContainer>
                        <s.ProgressBar $percentage={applicationRate} />
                    </s.ProgressBarContainer>
                </s.Applicants>
            )}
            
            <s.Fee>
                <p>참가비</p>
                {program.fee}
            </s.Fee>

            <s.DetailDescription>{program.description}</s.DetailDescription>
            
            <s.DetailInfoContainer>
                <s.DetailInfoRow>
                    <img src="/img/detail-page/calendar.png" style={{width:"15px", height:"15px"}}/>
                    <span>{formattedDate}</span>
                </s.DetailInfoRow>
                <s.DetailInfoRow>
                    <img src="/img/detail-page/clock.png" style={{width:"15px", height:"15px"}}/>
                    <span>{formattedTime}</span>
                </s.DetailInfoRow>
                <s.DetailInfoRow>
                    <img src="/img/detail-page/location.png" style={{width:"11px", height:"16px"}}/>
                    <span>{program.location}</span>
                </s.DetailInfoRow>
                <s.DetailInfoRow>
                    <img src="/img/detail-page/teacher.png" style={{width:"16px", height:"16px"}}/>
                    <span>{program.instructorName} 강사</span>
                </s.DetailInfoRow>
            </s.DetailInfoContainer>

            <s.FullWidthDivider />

            {program.supplies && program.supplies.length > 0 && (
                <s.DetailListSection>
                    <s.DetailListTitle>준비물</s.DetailListTitle>
                    <s.DetailList>
                        {program.supplies.map((supply, index) => (
                            <s.DetailListItem key={index}>{supply}</s.DetailListItem>
                        ))}
                    </s.DetailList>
                </s.DetailListSection>
            )}

            {program.proposal && (
                <s.DetailListSection>
                    <s.DetailListTitle>첨부자료</s.DetailListTitle>
                    <s.AttachmentBox href="/files/프로그램_기획서.pdf" download>
                        <s.AttachmentIcon>
                            <img src="/img/detail-page/proposal.png" alt="file" />
                        </s.AttachmentIcon>
                        <s.AttachmentInfo>
                            <s.AttachmentName>프로그램 기획서.pdf</s.AttachmentName>
                            <s.AttachmentSize>629.5 KB</s.AttachmentSize>
                        </s.AttachmentInfo>
                    </s.AttachmentBox>
                </s.DetailListSection>
            )}

            <s.DetailListSection>
                <s.DetailListTitle>문의 전화</s.DetailListTitle>
                <s.AttachmentBox href={`tel:${program.number}`}>
                    <s.AttachmentIcon>
                        <img src="/img/detail-page/telephone-blue.png" />
                    </s.AttachmentIcon>
                    <s.AttachmentInfo>
                        <s.AttachmentName>{program.number}</s.AttachmentName>
                    </s.AttachmentInfo>
                </s.AttachmentBox>
            </s.DetailListSection>
        </s.DetailPageLayout>
    );
}
