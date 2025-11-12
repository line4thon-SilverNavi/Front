import InputContainer from "@core/components/inputContainer";
import { useState } from "react";
import styled from "styled-components";


export default function HeaderHistory(){
    const [keyword, setKeyword] = useState("");
    const [noti, setNoti] = useState(false);

    return(
        <Wrapper>
            <SearchContainer>
            <InputContainer
                label=""
                placeholder="내용을 입력하여 검색하세요."
                value={keyword}
                onChange={(value) => setKeyword(value)}
                variant="filled"
                inputTypo="body2"
                width="100%"
            />
            <SearchIcon src="/img/header/search.png" alt="search" />
            </SearchContainer>
            <img src={noti ? "/img/header/notification-red.png" : "/img/header/notification.png"} 
            style={{height:"26px", width:"25px", marginTop:"5px"}} onClick={() => setNoti(false)}/>
        </Wrapper>
    );
}


const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const SearchContainer = styled.div`
    position: relative;
    width: 86%;
    
    input::placeholder {
        font-size: 14px !important;
        color: ${({ theme }) => theme.colors.gray04};
    }
`;

const SearchIcon = styled.img`
    position: absolute;
    right: 16px;
    top: 57%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    z-index: 10;
    pointer-events: none;
`;