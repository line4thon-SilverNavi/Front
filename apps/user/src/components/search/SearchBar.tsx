import styled from "styled-components";
import { useState } from "react";

type SearchBarProps = {
    placeholder?: string;
    onSearch: (query: string) => void;
};

export default function SearchBar({ placeholder = "검색어를 입력하세요", onSearch }: SearchBarProps){
    const [searchValue, setSearchValue] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch(searchValue);
        }
    };

    return(
        <Bar role="search">
            <Left>
            <SearchIcon aria-hidden viewBox="0 0 24 24">
            <path
                d="M21 21l-4.2-4.2m1.2-4.8a7 7 0 11-14 0 7 7 0 0114 0z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            </SearchIcon>
            <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="검색"
            />
            </Left>
        </Bar>
    );
}

/* ---------------- styles ---------------- */
export const Bar = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  width: 100%;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 1 auto;
  min-width: 0;
  height: 44.981px;
  padding: 0 15.99px;
  border-radius: 10px;
  ${({ theme }) => theme.fonts.body3};
  background-color: #f5f5f5;
`;

export const SearchIcon = styled.svg`
  width: 18px;
  height: 18px;
  color: ${({ theme }) => theme.colors.gray04};
  flex: 0 0 auto;
`;

export const Input = styled.input`
  border: 0;
  outline: 0;
  width: 100%;
  margin-top: 3px;
  color: ${({ theme }) => theme.colors.gray07};
  background-color: #f5f5f5;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray04};
  }
`;