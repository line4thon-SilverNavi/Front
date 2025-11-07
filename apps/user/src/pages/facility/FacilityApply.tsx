import { useLocation } from "react-router-dom";

export default function FacilityApplyPage() {
    const location = useLocation();
    const facilityId = location.state?.facilityId;

    return (
        <div>
            <h1>시설 신청</h1>
            <p>시설 ID: {facilityId}</p>
            {/* 신청 폼 작성 후 POST 요청 시 facilityId 함께 전송 */}
        </div>
    );
}