import styled from "styled-components";
import { useState, useEffect } from "react";
import { bookmarking } from "@apis/bookmark/bookmark";

type BookmarkButtonProps = {
    initialBookmarked: boolean;
    contentId: number;
    type: string;
};

export default function BookmarkButton({ 
    initialBookmarked, 
    contentId, 
    type
}: BookmarkButtonProps){
    const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

    // initialBookmarked가 변경되면 state도 업데이트 (새로고침 등)
    useEffect(() => {
        setIsBookmarked(initialBookmarked);
    }, [initialBookmarked]);

    const handleBookmarkClick = async () => {
        try {
            const response = await bookmarking({
                type: type,
                contentId: contentId
            });
            
            if (response?.isSuccess && response.data) {
                // 서버 응답의 status를 기반으로 상태 업데이트 ("on" or "off")
                const newStatus = response.data.status === "on";
                setIsBookmarked(newStatus);
                console.log(`북마크 ${response.data.status}:`, contentId);
            }
        } catch (error) {
            console.error("북마크 요청 실패:", error);
        }
    };

    return(
        <BookmarkBtn onClick={handleBookmarkClick}>
            <img 
                src={isBookmarked 
                    ? "/img/bookmark/bookmark-true.png" 
                    : "/img/bookmark/bookmark-false.png"
                } 
            />
        </BookmarkBtn>
    );
}

const BookmarkBtn = styled.button`
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
        width: 32px;
        height: 32px;
    }
`;