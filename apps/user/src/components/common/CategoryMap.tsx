import styled from "styled-components";
import { Button } from "@core/ui/button/Button";

interface CategoryMapProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function CategoryMap({ categories, selectedCategory, onCategoryChange }: CategoryMapProps) {
    return (
        <CategoryButtons>
            {categories.map((category) => (
                <Button
                    key={category}
                    tone={selectedCategory === category ? "blue" : "gray"}
                    variant={selectedCategory === category ? "subtle" : "subtle"}
                    size="sm"
                    radius="sm"
                    typo={selectedCategory === category ? "label1" : "label2"}
                    onClick={() => onCategoryChange(category)}
                >
                    {category}
                </Button>
            ))}
        </CategoryButtons>
    );
}

const CategoryButtons = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    overflow-x: auto;
    white-space: nowrap;
    
    &::-webkit-scrollbar {
        display: none;
    }
    
    -ms-overflow-style: none;
    scrollbar-width: none;
`;
