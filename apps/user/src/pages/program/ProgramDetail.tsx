import { Button } from "@core/ui/button";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useFormatDate, useFormatTime } from "@hooks/program/ProcessingTime";
import DetailPageLayout, {
    DetailTitle,
    DetailDescription,
    DetailInfoContainer,
    DetailInfoRow,
    DetailListSection,
    DetailListTitle,
    DetailList,
    DetailListItem,
    FullWidthDivider,
    Applicants,
    ApplicantText, 
    ProgressBarContainer, 
    ProgressBar,
    Fee,
    AttachmentBox,
    AttachmentIcon,
    AttachmentInfo,
    AttachmentName,
    AttachmentSize
} from "@components/common/datailPageLayout";
import { getProgramDetailDummy } from "@apis/dummy/programDetailDummy";
import type { ProgramDetailData } from "@apis/program/programDetail";
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
                const data = await getProgramDetailDummy(Number(programId));
                setProgram(data);
            }
        };
        fetchProgramDetail();
    }, [programId]);

    const handleApply = () => {
        navigate('/program/apply', { 
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
        <DetailPageLayout
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
            <DetailTitle>{program.name}</DetailTitle>

            {cardInfo && (
                <Applicants>
                    <img src="/img/detail-page/applicants.png" style={{width:"16px", height:"16px"}}/>
                    <ApplicantText>신청 {cardInfo.currentApplicants}/{cardInfo.capacity}명</ApplicantText>
                    <ProgressBarContainer>
                        <ProgressBar $percentage={applicationRate} />
                    </ProgressBarContainer>
                </Applicants>
            )}
            
            <Fee>
                <p>참가비</p>
                {program.fee}
            </Fee>

            <DetailDescription>{program.description}</DetailDescription>
            
            <DetailInfoContainer>
                <DetailInfoRow>
                    <img src="/img/detail-page/calendar.png" style={{width:"15px", height:"15px"}}/>
                    <span>{formattedDate}</span>
                </DetailInfoRow>
                <DetailInfoRow>
                    <img src="/img/detail-page/clock.png" style={{width:"15px", height:"15px"}}/>
                    <span>{formattedTime}</span>
                </DetailInfoRow>
                <DetailInfoRow>
                    <img src="/img/detail-page/location.png" style={{width:"11px", height:"16px"}}/>
                    <span>{program.location}</span>
                </DetailInfoRow>
                <DetailInfoRow>
                    <img src="/img/detail-page/teacher.png" style={{width:"16px", height:"16px"}}/>
                    <span>{program.instructorName} 강사</span>
                </DetailInfoRow>
            </DetailInfoContainer>

            <FullWidthDivider />

            {program.supplies && program.supplies.length > 0 && (
                <DetailListSection>
                    <DetailListTitle>준비물</DetailListTitle>
                    <DetailList>
                        {program.supplies.map((supply, index) => (
                            <DetailListItem key={index}>{supply}</DetailListItem>
                        ))}
                    </DetailList>
                </DetailListSection>
            )}

            {program.proposal && (
                <DetailListSection>
                    <DetailListTitle>첨부자료</DetailListTitle>
                    <AttachmentBox href="/files/프로그램_기획서.pdf" download>
                        <AttachmentIcon>
                            <img src="/img/detail-page/proposal.png" alt="file" />
                        </AttachmentIcon>
                        <AttachmentInfo>
                            <AttachmentName>프로그램 기획서.pdf</AttachmentName>
                            <AttachmentSize>629.5 KB</AttachmentSize>
                        </AttachmentInfo>
                    </AttachmentBox>
                </DetailListSection>
            )}

            <DetailListSection>
                <DetailListTitle>문의 전화</DetailListTitle>
                <AttachmentBox href={`tel:${program.number}`}>
                    <AttachmentIcon>
                        <img src="/img/detail-page/telephone-blue.png" />
                    </AttachmentIcon>
                    <AttachmentInfo>
                        <AttachmentName>{program.number}</AttachmentName>
                    </AttachmentInfo>
                </AttachmentBox>
            </DetailListSection>
        </DetailPageLayout>
    );
}
