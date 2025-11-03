import styled from "styled-components";
import { useState } from "react";
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

    const handleBookmarkClick = async () => {
        try {
            const response = await bookmarking({
                type: type,
                contentId: contentId
            });
            
            if (response.isSuccess) {
                setIsBookmarked(!isBookmarked);
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