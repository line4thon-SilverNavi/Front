import styled from "styled-components";

type TabContainerProps<T extends string> = {
    tabs: T[];
    activeTab: T;
    onTabChange: (tab: T) => void;
};

export default function TabContainer<T extends string>({ 
    tabs, 
    activeTab, 
    onTabChange 
}: TabContainerProps<T>) {
    return (
        <Container>
            {tabs.map((tab) => (
                <Tab 
                    key={tab}
                    $isActive={activeTab === tab} 
                    onClick={() => onTabChange(tab)}
                >
                    {tab}
                </Tab>
            ))}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray03};
`;

const Tab = styled.button<{ $isActive: boolean }>`
    flex: 1;
    padding: 10px;
    background: none;
    border: none;
    border-bottom: 5px solid ${({ $isActive, theme }) => 
        $isActive ? theme.colors.blue01 : 'transparent'};
    color: ${({ $isActive, theme }) => 
        $isActive ? theme.colors.gray07: theme.colors.gray04};
    ${({ theme }) => theme.fonts.body1};
    ${({ $isActive, theme }) => 
            $isActive ? theme.fonts.body1 : theme.fonts.label2};
    cursor: pointer;
    transition: all 0.2s;
    -webkit-tap-highlight-color: transparent;
    box-shadow: none;
    outline: none;

    &:hover {
        background: none;
        box-shadow: none;
    }

    &:active {
        background: none;
        box-shadow: none;
    }

    &:focus {
        outline: none;
        box-shadow: none;
    }
`;
