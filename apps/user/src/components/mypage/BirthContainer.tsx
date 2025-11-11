import { useState } from "react";
import styled from "styled-components";

type Props = {
    value: string;
    onChange: (birth: string) => void;
};

export default function BirthContainer({ value, onChange }: Props) {
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [date, setDate] = useState("");

    const handleDateChange = (newYear: string, newMonth: string, newDate: string) => {
        if (newYear && newMonth && newDate) {
            onChange(`${newYear}-${newMonth.padStart(2, '0')}-${newDate.padStart(2, '0')}`);
        }
    };

    return (
        <Container>
            <Label>돌봄 대상자 생년월일</Label>
            <InputRow>
                <InputWrapper>
                    <Input
                        value={year}
                        onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, '');
                            setYear(val);
                            handleDateChange(val, month, date);
                        }}
                        placeholder="0000"
                        maxLength={4}
                        type="number"
                    />
                    <Unit>년</Unit>
                </InputWrapper>
                
                <InputWrapper>
                    <Input
                        value={month}
                        onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, '');
                            setMonth(val);
                            handleDateChange(year, val, date);
                        }}
                        placeholder="00"
                        maxLength={2}
                        type="number"
                    />
                    <Unit>월</Unit>
                </InputWrapper>
                
                <InputWrapper>
                    <Input
                        value={date}
                        onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, '');
                            setDate(val);
                            handleDateChange(year, month, val);
                        }}
                        placeholder="00"
                        maxLength={2}
                        type="number"
                    />
                    <Unit>일</Unit>
                </InputWrapper>
            </InputRow>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    ${({ theme }) => theme.fonts.body1};
    color: ${({ theme }) => theme.colors.gray05};
`;

const InputRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 8px 0;

    &:focus-within {
        border-bottom-color: ${({ theme }) => theme.colors.blue02};
    }
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const Input = styled.input`
    border: 0;
    outline: 0;
    background: transparent;
    ${({ theme }) => theme.fonts.body2};
    color: ${({ theme }) => theme.colors.gray07};
    text-align: center;
    width: 80px;
    padding-bottom: 8px; 
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray03};

    &::placeholder {
        color: ${({ theme }) => theme.colors.gray04};
    }

    /* 숫자 입력 스피너 제거 */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    &[type=number] {
        -moz-appearance: textfield;
    }
`;

const Unit = styled.span`
    ${({ theme }) => theme.fonts.body2};
    color: ${({ theme }) => theme.colors.gray07};
`;
