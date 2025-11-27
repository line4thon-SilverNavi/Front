import styled, { css } from "styled-components";
import type { DefaultTheme } from "styled-components";

type FontKey = keyof DefaultTheme["fonts"];

type PlanOption = {
  value: string;
  name: string;
  price?: string;
  per?: string;
  tagLabel?: string;
  iconSrc?: string;
};

type PlanToggleGroupProps = {
  options: PlanOption[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  labelTypo?: FontKey;
  nameTypo?: FontKey;
  priceTypo?: FontKey;
};

export default function PlanToggleGroup({
  options,
  value,
  onChange,
  nameTypo = "title1",
  priceTypo = "heading1",
}: PlanToggleGroupProps) {
  return (
    <Field>
      <CardsWrapper>
        {options.map((opt) => {
          const isSelected = value === opt.value;
          const hasIcon = !!opt.iconSrc;

          return (
            <PlanCard
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              $selected={isSelected}
              onClick={() => onChange(opt.value)}
              $hasIcon={hasIcon}
            >
              {opt.tagLabel && !hasIcon && (
                <Tag aria-hidden="true">{opt.tagLabel}</Tag>
              )}
              {hasIcon && <Icon src={opt.iconSrc} />}

              <Name
                $nameTypo={nameTypo}
                $selected={isSelected}
                $hasIcon={hasIcon}
              >
                {opt.name}
              </Name>
              {!hasIcon && opt.price && (
                <TopRow>
                  <Price $priceTypo={priceTypo}>{opt.price}</Price>
                  <Per>/ 월</Per>
                </TopRow>
              )}
            </PlanCard>
          );
        })}
      </CardsWrapper>
    </Field>
  );
}

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardsWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const PlanCard = styled.button<{ $selected: boolean; $hasIcon: boolean }>`
  position: relative;
  flex: 1;
  padding: 16px 20px;
  border-radius: 16px;
  text-align: left;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.gray03};
  background: ${({ theme }) => theme.colors.gray01};
  display: flex;
  flex-direction: ${({ $hasIcon }) => ($hasIcon ? "row" : "column")};
  justify-content: ${({ $hasIcon }) => ($hasIcon ? "flex-start" : "center")};
  align-items: ${({ $hasIcon }) => ($hasIcon ? "center" : "flex-start")};
  gap: 10px;
  transition: all 0.2s ease;

  ${({ $selected, theme }) =>
    $selected &&
    css`
      border-color: ${theme.colors.blue01};
      background: ${theme.colors.blue03};
    `}
`;

const Tag = styled.span`
  position: absolute;
  top: -12px;
  right: -10%;
  transform: translateX(-50%);
  padding: 5px 15px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.signal};
  color: ${({ theme }) => theme.colors.gray01};
  ${({ theme }) => theme.fonts.label2};
`;

const Name = styled.p<{
  $nameTypo: FontKey;
  $selected: boolean;
  $hasIcon: boolean;
}>`
  ${({ theme, $nameTypo }) => theme.fonts[$nameTypo]};
  color: ${({ theme, $selected, $hasIcon }) =>
    $hasIcon && $selected ? theme.colors.blue01 : theme.colors.gray07};
`;

const Price = styled.span<{ $priceTypo: FontKey }>`
  ${({ theme, $priceTypo }) => theme.fonts[$priceTypo]};
  color: ${({ theme }) => theme.colors.blue01};
`;

const Per = styled.span`
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.gray05};
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;
