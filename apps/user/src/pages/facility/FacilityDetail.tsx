import { Button } from "@core/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import * as s from "@layouts/DetailPageLayout";
import { useEffect, useState } from "react";
import { getFacilityDetail, type FacilityDetailData } from "@apis/facility/facilityDetail";
import ApplyingModal from "@components/facility/ApplyingModal";
import ReviewCard from "@components/facility/ReviewCard";
import CardList from "@components/common/CardList";

export default function FacilityDetailPage() {
    const { facilityId } = useParams<{ facilityId: string }>();
    const [facility, setFacility] = useState<FacilityDetailData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchFacilityDetail = async () => {
            if (facilityId) {
                const data = await getFacilityDetail(Number(facilityId));
                setFacility(data);
            }
        };
        fetchFacilityDetail();
    }, [facilityId]);

    const handleApply = () => {
        setIsModalOpen(true);
    };

    if (!facility) {
        return <div>로딩 중...</div>;
    }

    const displayImage = facility.images && facility.images.length > 0 
        ? facility.images[0] 
        : "/img/dummy/facility-default.png";

    return (
        <>
            {isModalOpen && <ApplyingModal onClose={() => setIsModalOpen(false)} facilityId={Number(facilityId)} facilityName={facility.name} />}
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

            <s.DetailListSection>
                <s.DetailListTitle className="moreinfo">이용 후기
                    <p onClick={() => navigate("review")}>자세히보기</p>
                </s.DetailListTitle>
                {facility.reviews.length > 0 ? (
                    <CardList 
                        items={facility.reviews.slice(0, 2)}
                        renderCard={(review) => (
                            <ReviewCard key={review.id} review={review} />
                        )}
                        direction="vertical"
                        gap="0.25rem"
                    />
                ) : (
                    <div style={{ textAlign: "center", padding: "20px 0", color: "#999" }}>
                        <p>아직 리뷰가 없어요</p>
                        <p>리뷰를 남겨주세요!</p>
                    </div>
                )}
            </s.DetailListSection>
        </s.DetailPageLayout>
        </>
    );
}
