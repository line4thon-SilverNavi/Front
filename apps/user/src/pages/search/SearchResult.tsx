import { useSearchParams } from "react-router-dom";

export default function SearchResult(){
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    return(
        <div>
            <p>검색창입니다.</p>
            <p>검색어: {keyword}</p>
        </div>
    );
}