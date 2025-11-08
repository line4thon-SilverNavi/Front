import { Button } from "@core/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import * as s from "@components/common/datailPageLayout";
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
        <s.DetailPageLayout
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
            <s.DetailTitle>{facility.name}</s.DetailTitle>
            
            <s.DetailRating 
                rating={facility.averageRating} 
                reviewCount={facility.reviewCount} 
            />
            
            <s.DetailDescription>{facility.description}</s.DetailDescription>
            
            <s.DetailInfoContainer>
                <s.DetailInfoRow>
                    <img src="/img/detail-page/clock.png" style={{width:"14px", height:"14px"}}/>
                    <span>{facility.operatingHours}</span>
                </s.DetailInfoRow>
                <s.DetailInfoRow>
                    <img src="/img/detail-page/telephone.png" style={{width:"13px", height:"13px"}}/>
                    <span>{facility.number}</span>
                </s.DetailInfoRow>
                <s.DetailInfoRow>
                    <img src="/img/detail-page/location.png" style={{width:"11px", height:"16px"}}/>
                    <span>{facility.address}</span>
                </s.DetailInfoRow>
            </s.DetailInfoContainer>

            <s.FullWidthDivider />

            {facility.mainServices.length > 0 && (
                <s.DetailListSection>
                    <s.DetailListTitle>주요 서비스</s.DetailListTitle>
                    <s.DetailList>
                        {facility.mainServices.map((service, index) => (
                            <s.DetailListItem key={index}>{service}</s.DetailListItem>
                        ))}
                    </s.DetailList>
                </s.DetailListSection>
            )}

            {facility.reviews.length > 0 && (
                <s.DetailListSection>
                    <s.DetailListTitle className="moreinfo">이용 후기
                        <p>자세히보기</p>
                    </s.DetailListTitle>
                    {facility.reviews.map((review) => (
                        <s.ReviewCard key={review.id}>
                            <s.ReviewHeader>
                                <s.ReviewName>
                                    <p>{review.authorName[0]}</p>
                                    {review.authorName[0]}**</s.ReviewName>
                                <s.ReviewDate>{formatDate(review.createdAt)}</s.ReviewDate>
                            </s.ReviewHeader>
                            <s.RatingStar rating={review.rating} />
                            <s.ReviewText>{review.content}</s.ReviewText>
                        </s.ReviewCard>
                    ))}
                </s.DetailListSection>
            )}
        </s.DetailPageLayout>
    );
}
