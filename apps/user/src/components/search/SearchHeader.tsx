import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function SearchHeader(){

    const navigate = useNavigate();
    const handleBack = () => (navigate(-1));
    
    const handleSearch = (query: string) => {
        if (query.trim()) {
            navigate(`/search/result?keyword=${encodeURIComponent(query)}`);
        }
    };

    return(
        <Wrapper>
            <img src="/img/auth/back.png" onClick={handleBack} />
            <SearchBar 
            placeholder="프로그램, 시설 검색" 
            onSearch={handleSearch} 
            />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;

    img{
        height: 17px;
    }
`;