import { Button } from "@core/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import DetailPageLayout, {
    DetailTitle,
    DetailRating,
    DetailDescription,
    DetailInfoContainer,
    DetailInfoRow,
    DetailListSection,
    DetailListTitle,
    DetailList,
    DetailListItem,
    FullWidthDivider,
    ReviewCard,
    ReviewHeader,
    ReviewName,
    ReviewDate,
    RatingStar,
    ReviewText,
} from "@components/common/datailPageLayout";
import { useEffect, useState } from "react";
import { getFacilityDetailDummy } from "@apis/dummy/facilityDetailDummy";
import type { FacilityDetailData } from "@apis/facility/facilityDetail";

export default function FacilityDetailPage() {
    const navigate = useNavigate();
    const { facilityId } = useParams<{ facilityId: string }>();
    const [facility, setFacility] = useState<FacilityDetailData | null>(null);
    
    // 날짜 포맷 함수: 2025-10-25 형식으로 변환
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    useEffect(() => {
        const fetchFacilityDetail = async () => {
            if (facilityId) {
                const data = await getFacilityDetailDummy(Number(facilityId));
                setFacility(data);
            }
        };
        fetchFacilityDetail();
    }, [facilityId]);

    const handleApply = () => {
        navigate('/facility/apply', { state: { facilityId } });
    };

    if (!facility) {
        return <div>로딩 중...</div>;
    }

    const displayImage = facility.images && facility.images.length > 0 
        ? facility.images[0] 
        : "/img/dummy/facility-default.png";

    return (
        <DetailPageLayout
            image={displayImage}
            category={facility.category}
            bookmarkProps={{
                initialBookmarked: facility.bookmarked,
                contentId: Number(facilityId),
                type: "시설",
            }}
            footer={
                <Button tone="blue" radius="pill" size="lg" fullWidth onClick={handleApply}>
                    신청하기
                </Button>
            }
        >
            <DetailTitle>{facility.name}</DetailTitle>
            
            <DetailRating 
                rating={facility.averageRating} 
                reviewCount={facility.reviewCount} 
            />
            
            <DetailDescription>{facility.description}</DetailDescription>
            
            <DetailInfoContainer>
                <DetailInfoRow>
                    <img src="/img/detail-page/clock.png" style={{width:"14px", height:"14px"}}/>
                    <span>{facility.operatingHours}</span>
                </DetailInfoRow>
                <DetailInfoRow>
                    <img src="/img/detail-page/telephone.png" style={{width:"13px", height:"13px"}}/>
                    <span>{facility.number}</span>
                </DetailInfoRow>
                <DetailInfoRow>
                    <img src="/img/detail-page/location.png" style={{width:"11px", height:"16px"}}/>
                    <span>{facility.address}</span>
                </DetailInfoRow>
            </DetailInfoContainer>

            <FullWidthDivider />

            {facility.mainServices.length > 0 && (
                <DetailListSection>
                    <DetailListTitle>주요 서비스</DetailListTitle>
                    <DetailList>
                        {facility.mainServices.map((service, index) => (
                            <DetailListItem key={index}>{service}</DetailListItem>
                        ))}
                    </DetailList>
                </DetailListSection>
            )}

            {facility.reviews.length > 0 && (
                <DetailListSection>
                    <DetailListTitle className="moreinfo">이용 후기
                        <p>자세히보기</p>
                    </DetailListTitle>
                    {facility.reviews.map((review) => (
                        <ReviewCard key={review.id}>
                            <ReviewHeader>
                                <ReviewName>
                                    <p>{review.authorName[0]}</p>
                                    {review.authorName[0]}**</ReviewName>
                                <ReviewDate>{formatDate(review.createdAt)}</ReviewDate>
                            </ReviewHeader>
                            <RatingStar rating={review.rating} />
                            <ReviewText>{review.content}</ReviewText>
                        </ReviewCard>
                    ))}
                </DetailListSection>
            )}
        </DetailPageLayout>
    );
}
