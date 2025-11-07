import { Button } from "@core/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import BookmarkButton from "@components/common/BookmarkButton";
import DetailPageLayout from "@components/common/datailPageLayout";

export default function FacilityDetailPage() {
    const navigate = useNavigate();
    const { facilityId } = useParams<{ facilityId: string }>();
    
    const handleApply = () => {
        navigate('/facility/apply', { state: { facilityId } });
    };

    return (
        <DetailPageLayout
            title="시설 상세"
            footer={
                <Button tone="blue" radius="pill" size="lg" onClick={handleApply}>
                    신청하기
                </Button>
            }
        >
            

        </DetailPageLayout>
    );
}
