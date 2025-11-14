import DefaultLayout from "@layouts/DefaultLayout";
import CommonHeader from "@components/common/CommonHeader";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { type NotificationResponse, getNotificationList } from "@apis/notification/notilist";
import CardList from "@components/common/CardList";
import NotiCard from "@components/notification/NotiCard";
import { postReadNotification } from "@apis/notification/readnoti";

export default function Notification(){
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await getNotificationList();
                setNotifications(data);
                
                // isRead가 false인 알림들에 대해 읽음 처리
                const unreadNotifications = data.filter(noti => !noti.isRead);
                await Promise.all(
                    unreadNotifications.map(noti => 
                        postReadNotification(noti.notificationId)
                    )
                );
            } catch (error) {
                console.error("알림 목록을 불러오는데 실패했습니다:", error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <DefaultLayout header={<CommonHeader title="알림" />}>
            <Wrapper>
                {notifications.length === 0 ? (
                    <EmptyState>
                        <img src="/img/notification/noti.png" />
                        <EmptyText>새로운 알림이 없습니다.</EmptyText>
                    </EmptyState>
                ) : (
                    <>
                    <CardList
                        items={notifications}
                        renderCard={(notification) => (
                            <NotiCard 
                                key={notification.notificationId} 
                                notification={notification} 
                            />
                        )}
                        direction="vertical"
                    />
                    <Bottom>최근 30일 이내의 알림만 보여집니다.</Bottom>
                    </>
                )}
            </Wrapper>
        </DefaultLayout>
    );
}

const Wrapper = styled.div`
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 8rem;
    padding: 4rem 1rem;
    gap: 1rem;
    img{
        width: 53px;
        height: 56px;
    }
`;


const EmptyText = styled.div`
    ${({ theme }) => theme.fonts.title2};
    color: ${({ theme }) => theme.colors.gray04};
`;

const Bottom = styled.p`
    ${({ theme }) => theme.fonts.caption};
    color: ${({ theme }) => theme.colors.gray04};
    margin: 2rem 0;
`;