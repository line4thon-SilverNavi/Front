import styled from "styled-components";
import type { NotificationResponse } from "@apis/notification/notilist";
import { formatNotification } from "../../utils/notificationFormatter";
import { useRelativeTime } from "@core/hooks/ProcessingTime";
import { useState } from "react";

interface NotiCardProps {
    notification: NotificationResponse;
}

export default function NotiCard({ notification }: NotiCardProps) {
    const { icon, title, details } = formatNotification(notification);
    const timeAgo = useRelativeTime(notification.createdAt);
    const showFacility = notification.type === "리뷰 답변" || notification.type === "상담";
    const [showRejectReason, setShowRejectReason] = useState(false);
    
    const isRejected = (notification.type === "상담" || notification.type === "프로그램 신청") && notification.status === "거부";
    
    return (
        <CardWrapper $isRead={notification.isRead}>
            <IconWrapper>
                <IconImage src={icon} />
            </IconWrapper>
            <InfoContainer>
                <Title>{title}</Title>
                {showFacility && <Facility>🏥 {notification.targetName}</Facility>}
                {details && <Details>{details}</Details>}
                
                {isRejected && notification.rejectReason && (
                    <>
                        <RejectToggle onClick={(e) => {
                            e.stopPropagation();
                            setShowRejectReason(!showRejectReason);
                        }}>
                            거부 사유 보기 &gt;
                        </RejectToggle>
                        
                        {showRejectReason && (
                            <RejectReasonBox>
                                <RejectReasonTitle>거부 사유</RejectReasonTitle>
                                <RejectReasonContent>{notification.rejectReason}</RejectReasonContent>
                            </RejectReasonBox>
                        )}
                    </>
                )}
                
                <TimeStamp>{timeAgo}</TimeStamp>
            </InfoContainer>
        </CardWrapper>
    );
}

const CardWrapper = styled.div<{ $isRead: boolean }>`
    display: flex;
    padding: 1.3rem 1rem;
    background: ${({ $isRead, theme }) => $isRead ? 'transparent' : theme.colors.blue03};
    border-radius: 8px;
    border: 1.5px solid ${({ $isRead, theme }) => $isRead ? theme.colors.gray03 : theme.colors.blue01};
    gap: 1rem;
`;


const IconWrapper = styled.div`
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
`;

const IconImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;


const InfoContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

const Title = styled.div`
    ${({ theme }) => theme.fonts.title3};
    color: ${({ theme }) => theme.colors.gray07};
`;

const Facility = styled.div`
    ${({ theme }) => theme.fonts.body4};
    color: ${({ theme }) => theme.colors.blue01};
    margin-top: 0.15rem;
`;

const Details = styled.div`
    ${({ theme }) => theme.fonts.body4};
    color: ${({ theme }) => theme.colors.gray05};
    margin-top: 0.25rem;
`;

const TimeStamp = styled.div`
    ${({ theme }) => theme.fonts.caption};
    color: ${({ theme }) => theme.colors.gray05};
`;

const RejectToggle = styled.div`
    ${({ theme }) => theme.fonts.body4};
    color: ${({ theme }) => theme.colors.blue01};
    cursor: pointer;
    margin-bottom: 0.5rem;
    display: inline-block;
    
    &:hover {
        text-decoration: underline;
    }
`;

const RejectReasonBox = styled.div`
    background: #FFF5F5;
    border: 1px solid #FFE0E0;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 0.5rem;
`;

const RejectReasonTitle = styled.div`
    ${({ theme }) => theme.fonts.body3};
    color: ${({ theme }) => theme.colors.signal};
    margin-bottom: 0.2rem;
`;

const RejectReasonContent = styled.div`
    ${({ theme }) => theme.fonts.body4};
    color: ${({ theme }) => theme.colors.gray07};
    line-height: 1.5;
    white-space: pre-wrap;
`;
