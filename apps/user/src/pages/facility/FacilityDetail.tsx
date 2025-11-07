import { Button } from "@core/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import AuthLayout from "@components/auth/authLayout";

export default function FacilityDetailPage() {
    const navigate = useNavigate();
    const { facilityId } = useParams<{ facilityId: string }>();
    
    const handleApply = () => {
        navigate('/facility/apply', { state: { facilityId } });
    };

    return (
        <AuthLayout
            title="시설 상세"
            footer={
                <Button tone="blue" radius="pill" size="lg" onClick={handleApply}>
                    신청하기
                </Button>
            }
        >
            <div>시설 ID: {facilityId}</div>
        </AuthLayout>
    );
}
