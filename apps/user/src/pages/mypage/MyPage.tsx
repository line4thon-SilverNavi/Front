import * as S from "./Mypage_styled";
import DefaultLayout from "@layouts/DefaultLayout";
import NavBar from "@components/common/NavBar";
import { useEffect, useState } from "react";
import { getMypage, type MypageResponse } from "@apis/mypage/mypage";
import { useNavigate } from "react-router-dom";
import { addHyphen } from "@hooks/ProcessingTel";

export default function Mypage () {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<MypageResponse | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getMypage();
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.error("사용자 정보를 불러오는데 실패했습니다:", error);
      }
    };
    
    fetchUserData();
  }, []);

  const isSelf = userData?.relation === "본인";

  return(
    <DefaultLayout 
    header={<S.Header>마이페이지</S.Header>} 
    footer={<NavBar />}>
      <S.Wrapper>
        <S.CompleteProfile $hidden={!!userData?.hasCareTarget}>
          <S.ProfileTitle>
            <S.TitleContainer>
            <img src="/img/mypage/complete.png" style={{width:"40px", height:"40px"}}/>
            프로필 완성하기
            </S.TitleContainer>
            <p>80%</p>
          </S.ProfileTitle>
          <S.Container>
          <S.ProgressBarContainer>
              <S.ProgressBar $percentage={80} />
          </S.ProgressBarContainer>
          <S.ProfileDescription>
            프로그램 신청이나 시설 상담을 위해서는 추가 정보가 필요합니다.
          </S.ProfileDescription>
          <S.CompleteButton onClick={() => navigate('/setuser')}>
            지금 완성하기
            <img src="/img/home/arrow-right.png" style={{width:"4px", height:"8px"}}/>
          </S.CompleteButton>
          </S.Container>
        </S.CompleteProfile>

        {isSelf ? (
          <S.ProfileContainer>
          <S.Profile>
              <S.ProfileIcon>{userData?.careTargetName?.[0] || "-"}</S.ProfileIcon>
              <S.ProfileInfo>
                <S.NameContainer>
                <S.ProfileName>{userData?.careTargetName || "-"}님</S.ProfileName>
                <S.ProfileRole>본인</S.ProfileRole>
                </S.NameContainer>
                <S.ProfilePhone>{addHyphen(userData?.careTargetPhone || "-")}</S.ProfilePhone>
              </S.ProfileInfo>
          </S.Profile>
          </S.ProfileContainer>
        ) : (
            <S.ProfileContainer>
            <S.Profile>
              <S.ProfileIcon>{userData?.guardianName?.[0] || "-"}</S.ProfileIcon>
              <S.ProfileInfo>
                <S.NameContainer>
                <S.ProfileName>{userData?.guardianName || "-"}님</S.ProfileName>
                <S.ProfileRole>{userData?.relation || "보호자"}</S.ProfileRole>
                </S.NameContainer>
                <S.ProfilePhone>{addHyphen(userData?.guardianPhone || "")}</S.ProfilePhone>
              </S.ProfileInfo>
            </S.Profile>
                <S.CareTargetSection>
                <S.CareTargetTitle>
                  <img src="/img/mypage/heart-white.png" style={{width:"16px", height:"16px"}}/>
                  돌봄 대상자
                </S.CareTargetTitle>
                <S.CareTargetGrid>
                  <S.CareTargetItem>
                    <S.CareTargetLabel>이름</S.CareTargetLabel>
                    <S.CareTargetValue>{userData?.careTargetName || "-"}</S.CareTargetValue>
                  </S.CareTargetItem>
                  <S.CareTargetItem>
                    <S.CareTargetLabel>관계</S.CareTargetLabel>
                    <S.CareTargetValue>{userData?.relation || "-"}</S.CareTargetValue>
                  </S.CareTargetItem>
                  <S.CareTargetItem>
                    <S.CareTargetLabel>생년월일</S.CareTargetLabel>
                    <S.CareTargetValue>{userData?.careTargetBirth || "-"}</S.CareTargetValue>
                  </S.CareTargetItem>
                  <S.CareTargetItem>
                    <S.CareTargetLabel>성별</S.CareTargetLabel>
                    <S.CareTargetValue>{userData?.careTargetGender || "-"}</S.CareTargetValue>
                  </S.CareTargetItem>
                </S.CareTargetGrid>
              </S.CareTargetSection>
            </S.ProfileContainer>
        )}

        <S.MyActivity>
          <S.Title>나의 활동</S.Title>
          <S.ActivityContainer>
            <S.ActivityCard onClick={() => navigate('/history')}>
              <S.ActivityCount>{userData?.consultCount || 0}</S.ActivityCount>
              <S.ActivityLabel>신청한 <br/> 프로그램</S.ActivityLabel>
            </S.ActivityCard>
            <S.ActivityCard onClick={() => navigate('/bookmark')}>
              <S.ActivityCount>{userData?.bookmarkCount || 0}</S.ActivityCount>
              <S.ActivityLabel>찜한 목록</S.ActivityLabel>
            </S.ActivityCard>
            <S.ActivityCard onClick={() => navigate('/history')}>
              <S.ActivityCount>{userData?.reviewCount || 0}</S.ActivityCount>
              <S.ActivityLabel>리뷰 작성</S.ActivityLabel>
            </S.ActivityCard>
          </S.ActivityContainer>
        </S.MyActivity>

        <S.Menu>
          <S.Title>메뉴</S.Title>
          <S.MenuContainer>
            <S.MenuList type="bookmark" onClick={() => navigate('/bookmark')}>
              <S.Left>
                <img src="/img/mypage/heart-red.png" style={{width:"17px", height:"14px"}}/>
                찜한 목록
              </S.Left>
              <S.Right>
                <S.Red>
                  {userData?.bookmarkCount || 0}
                </S.Red>
                <img src="/img/home/arrow-right.png" style={{width:"5px", height:"10px"}}/>
              </S.Right>
            </S.MenuList>
            <S.MenuList type="setting" onClick={() => navigate('/setuser')}>
              <S.Left>
                <img src="/img/mypage/setting.png" style={{width:"18px", height:"18px"}}/>
                개인 정보 설정
              </S.Left>
              <S.Right>
                <img src="/img/home/arrow-right.png" style={{width:"5px", height:"10px"}}/>
              </S.Right>
            </S.MenuList>
          </S.MenuContainer>
        </S.Menu>

        <S.LogoutButton onClick={() => navigate('/intro')}>
          <img src="/img/mypage/logout.png" style={{width:"20px", height:"20px"}}/>
          로그아웃
        </S.LogoutButton>
      </S.Wrapper>
    </DefaultLayout>
  );
}