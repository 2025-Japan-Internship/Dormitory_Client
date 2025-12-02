import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Bell from '../assets/bell.png';
import Profile from '../assets/profile.png';
import Food from '../assets/food.png';
import Post from '../assets/post.png';
import Suggest from '../assets/suggest.png';
import Morning from '../assets/morning.png';
import Arrow from '../assets/arrow.png';
import Qr from '../assets/qr.png';
import { useLocation,useNavigate } from "react-router-dom";


const COLORS = {
  primary: '#4CAF50', // 초록색 강조
  secondary: '#333333', // 기본 텍스트
  lightText: '#666666',
  background: '#f8f8f8', // 배경색
  cardGreen: '#2ec757', // 슬라이더 초록색 카드
  cardLightGreen: '#90df99', // 슬라이더 밝은 초록색 (페이지네이션)
};

// --- styled-components 정의 ---

// 1. 전체 컨테이너
const Container = styled.div`
    width: 393px;
    height: 1018px;
`;

// 2. 헤더 섹션
const Header = styled.header`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  justify-content: space-between;
  padding-top:24px;
  padding-left:16px;
  padding-bottom:24px;
`;

const Greeting = styled.p`
    color: #111;
    font-family: "SF Pro";
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    margin:0;
`;
const Name = styled.p`
    color: #23D97B;
    font-family: "SF Pro";
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    margin:0;
`;
const Headerment = styled.div`
    width:215px;
    height:60px;
`;
const HeaderIcons = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 19px;
`;
const HeaderGret = styled.div`
  display: colu;
  align-items: center;
`;

// 임시 알림 벨과 프로필 아이콘 (실제로는 SVG/Image 사용)
const NotificationBell = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(${Bell});
`;

const ProfileCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #cccccc;
  border: 1px solid #eeeeee;
`;

// 3. 슬라이더 섹션
const SliderSection = styled.div`
  padding: 15px;
  padding-bottom: 5px;
  background-color: #ffffff;
  margin-bottom:30px;
`;

// 슬라이더 래퍼 (가로 스크롤 가능)
const SliderWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  padding-bottom: 10px;
  
  /* 스크롤바 숨김 */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// 슬라이더 카드 (핵심 디자인)
const SliderCard = styled.div`
  flex-shrink: 0;
  width: 267px; /* 요청하신 너비 */
  height: 200px; /* 요청하신 높이 */
  margin-right: 12px;
  padding: 20px;
  border-radius: 12px;
  scroll-snap-align: start;
  box-sizing: border-box;
  background: linear-gradient(150deg, #23D97B 12.39%, #23D9A5 87.61%);

  
  /* 내부 요소 수직 정렬을 위한 Flexbox */
  display: flex;
  flex-direction: column;
`;

// '12분전' 뱃지 스타일
const TimeAgo = styled.p`
    font-size: 12px;
    font-weight: bold;
    color: ${COLORS.cardGradientStart}; /* 연두색 텍스트 */
    background-color: #ffffff; /* 흰색 배경 */
    padding: 4px 8px;
    border-radius: 8px;
    margin: 0 0 15px 0; /* 아랫 간격 */
    width: fit-content;
`;

// 아바타와 이름/번호를 감싸는 컨테이너
const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 30px; /* 제목과의 간격 */
`;

// 아바타 스타일
const UserAvatar = styled.div`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #ffffff; /* 흰색 아바타 배경 */
    flex-shrink: 0;
    background-image: url(${Profile});
`;

// 이름과 번호 텍스트를 감싸는 컨테이너
const UserText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

// 이름 스타일
const UserName = styled.p`
    color: #FFF;
    font-size: 16px;
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
`;

// 번호 스타일
const UserPhone = styled.p`
    color: rgba(255, 255, 255, 0.8); /* 연한 흰색 */
    font-size: 14px;
    font-weight: 400;
    margin: 0;
    line-height: 1.2;
`;

// 하단 제목 ('수능기간 휴관 안내') 스타일
const CardTitle = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
    
    /* 👈 이 부분이 핵심: 남은 공간을 밀어 제목을 맨 아래에 배치 */
    margin: auto 0 0 0; 
    
    padding-top: 15px; 
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// 오른쪽 화살표 아이콘
const ArrowIcon = styled.span`
    font-size: 20px;
    font-weight: 700;
    color: #FFF;
`;

// 페이지네이션 점 컨테이너
const PaginationDots = styled.div`
    display: flex;
    padding: 0 8px;
    align-items: center;
    gap: 4px;
`;

// 페이지네이션 점 스타일
const Dot = styled.span`
    width: 28px;
    height: 5px;
    border-radius: 100px;
    background: ${(props) => (props.active ? "#23D97B" : "#CCC")};
    transition: background 0.3s;
`;

// 4. 아이콘 내비게이션 섹션
const NavIcons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start; /* 상단 정렬 */
  padding: 15px 10px;
  background-color: #ffffff; /* 배경색 추가 */
  margin-top: 10px; /* 슬라이더와의 간격 */
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px; /* 레이블과의 간격 */
`;

// 이미지 아이콘 컴포넌트 정의
const Foodimg = styled.div`
    width: 25px;
    height: 25px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(${Food}); 
`;
const Postimg = styled.div`
    width: 25px;
    height: 25px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(${Post}); 
`;
const Suggestimg = styled.div`
    width: 25px;
    height: 25px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(${Suggest}); 
`;
const Morningimg = styled.div`
    width: 25px;
    height: 25px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(${Morning}); 
`;

const IconLabel = styled.p`
  /* 👈 레이블 스타일 수정 */
  font-size: 14px; /* 글꼴 크기 키움 */
  color: ${COLORS.secondary};
  font-weight: 500;
  margin: 0;
`;

// 5. 급식 정보 (Meal Info)
const MealSection = styled.div`
  padding: 15px;
  margin-top: 10px;
  background-color: #F4F4F4;
`;

const SectionHeader = styled.div`
    display: flex;
    width: 353px;
    justify-content: space-between;
    align-items: center;
`;

const SectionTitle = styled.p`
    color: #444;
    font-family: "SF Pro";
    font-size: 21px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const MoreArrow = styled.div`
    display: flex;
    width: 25px;
    height: 25px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    line-height: normal;
    background-image: url(${Arrow}); 
`;

const MealCard = styled.div`
    width: 100%;
    max-width: 361px;
    border-radius: 12px;
    border: 0.08px solid #CCC;
    background: #FFF;
    padding: 18px 20px 24px 24px;
    box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
`;

const MealTimeSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`;

const TimeText = styled.p`
    color: #444;
    font-family: "SF Pro";
    font-size: 16px;
    font-style: normal;
    font-weight: 590;
    line-height: normal;
`;

const TodayBadge = styled.span`
    color: #FFF;
    font-family: "SF Pro";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    padding: 6px 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 100px;
    background: #23D97B;
`;

const KcalText = styled.p`
    color: #23D97B;
    font-family: "SF Pro";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const MenuText = styled.p`
    color: #4D5967;
    font-family: "SF Pro";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

// 6. 기상송 리스트 (Music List)
const MusicSection = styled.div`
  padding: 15px;
  background: #F4F4F4;
`;

const MusicList = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  padding-bottom: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MusicCard = styled.div`
  flex-shrink: 0;
  width: 100px; /* 고정 너비 */
  cursor: pointer;
`;

const AlbumArt = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-bottom: 5px;
  background-color: #cccccc; /* 임시 배경색 */
  background-image: url(${(props) => props.$imgUrl});
  background-size: cover;
  background-position: center;
`;

const SongTitle = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: ${COLORS.secondary};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Artist = styled.p`
  font-size: 11px;
  color: ${COLORS.lightText};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// --- 더미 데이터 ---
const SLIDER_CARDS = [
  { type: 'main', time: '12분전', userName: '김아람샘', phone: '010.1234.1234', title: '수능기간 휴관 안내', active: true },
  { type: 'sub', time: '1일전', userName: '김예나샘', phone: '010.5678.5678', title: '정기점검 공지', active: false },
  { type: 'sub', time: '2일전', userName: '이철수샘', phone: '010.9012.9012', title: '학사 일정 변경', active: false },
];


const MEAL = {
  time: '아침',
  kcal: '625.8 Kcal',
  menu: '귀리밥, 애호박찌개 10), 소보로메추리알조림 13), 배추김치 (9), 브로콜리&초장 13)'
};


const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const newSong = location.state?.newSong;
    const sliderRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const [musicList, setMusicList] = useState([]);

    useEffect(() => {
        if (newSong) {
          setMusicList(prev => [...prev, newSong]);
          navigate(location.pathname, { replace: true, state: {} });
        }
      }, [newSong, navigate, location.pathname]);


      const handleScroll = () => {
        const slider = sliderRef.current;
        if (!slider) return;
    
        // 현재 스크롤 위치
        const scrollLeft = slider.scrollLeft;
    
        // 슬라이드 하나의 너비 + margin
        const slideWidth = 267 + 12; // SliderCard width + marginRight
    
        // 현재 activeIndex 계산
        const index = Math.round(scrollLeft / slideWidth);
        setActiveIndex(index);
      };
  return (
    <Container>
      <Header>
        <Headerment>
            <Name>김미림님,</Name>
            <Greeting>오늘 하루도 힘내세요</Greeting>
        </Headerment>
        <HeaderIcons>
          <NotificationBell></NotificationBell>
          <ProfileCircle />
        </HeaderIcons>
      </Header>

      {/* 2. 슬라이더 */}
      <SliderSection>
        <SliderWrapper  ref={sliderRef} onScroll={handleScroll}>
          {SLIDER_CARDS.map((card, index) => (
            <SliderCard key={index}>
              {/* 1. 상단 뱃지 */}
              <TimeAgo>{card.time}</TimeAgo>
              
              {/* 2. 중간 정보 */}
              <UserInfo>
                    <UserAvatar />
                    <UserText>
                        <UserName>{card.userName}</UserName>
                        <UserPhone>{card.phone}</UserPhone>
                    </UserText>
              </UserInfo>
              
              {/* 3. 하단 제목 */}
              <CardTitle>
                {card.title}
                <ArrowIcon>〉</ArrowIcon>
              </CardTitle>
            </SliderCard>
          ))}
        </SliderWrapper>
        <PaginationDots>
          {SLIDER_CARDS.map((card, index) => (
            <Dot key={index} $active={index === activeIndex} />
          ))}
        </PaginationDots>
      </SliderSection>

      {/* 3. 내비게이션 아이콘 */}
      <NavIcons>
        {/* 1. 급식 */}
        <NavItem>
          <IconWrapper>
          <Foodimg></Foodimg>
          </IconWrapper>
          <IconLabel>급식</IconLabel>
        </NavItem>
        
        {/* 2. 공지사항 */}
        <NavItem onClick={() => navigate("/noticeList")}>
          <IconWrapper>
            <Postimg></Postimg>
          </IconWrapper>
          <IconLabel>공지사항</IconLabel>
        </NavItem>
        
        {/* 3. 건의사항 */}
        <NavItem onClick={() => navigate("/suggestion")}>
          <IconWrapper>
            <Suggestimg></Suggestimg>
          </IconWrapper>
          <IconLabel>건의사항</IconLabel>
        </NavItem>
        
        {/* 4. 기상송 */}
        <NavItem onClick={() => navigate("/song")}>
          <IconWrapper>
            <Morningimg></Morningimg>
          </IconWrapper>
          <IconLabel>기상송</IconLabel>
        </NavItem>
      </NavIcons>

      {/* 4. 급식 정보 */}
      <MealSection>
        <SectionHeader>
          <SectionTitle>오늘의 급식</SectionTitle>
          <MoreArrow></MoreArrow>
        </SectionHeader>
        <MealCard>
          <MealTimeSection>
            <TimeText>{MEAL.time}</TimeText>
            <TodayBadge>오늘</TodayBadge>
          </MealTimeSection>
          <KcalText>{MEAL.kcal}</KcalText>
          <MenuText>{MEAL.menu}</MenuText>
        </MealCard>
      </MealSection>

      {/* 5. 기상송 리스트 */}
      <MusicSection>
      <h2>오늘의 기상송</h2>
      <MusicList>
        {musicList.map((music, idx) => (
          <MusicCard key={idx}>
            <AlbumArt $imgUrl={music.imgUrl} />
            <SongTitle>{music.title}</SongTitle>
            <Artist>{music.artist}</Artist>
          </MusicCard>
        ))}
      </MusicList>
    </MusicSection>

      {/* 오른쪽 하단 QR 스캐너 버튼 (임시) */}
      <FloatingScanner>
        <ScannerIcon></ScannerIcon>
      </FloatingScanner>
    </Container>
  );
};

// 오른쪽 하단 플로팅 버튼 스타일
const FloatingScanner = styled.div`
    position: fixed;
    right: 15px;
    bottom: 15px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
    border-radius: 34px;
    background: #23D97B;
    box-shadow: 0 3.4px 8.5px 0 rgba(0, 0, 0, 0.10);
`;

const ScannerIcon = styled.div`
    width: 40.8px;
    height: 40.8px;
    flex-shrink: 0;
    aspect-ratio: 40.80/40.80;
    background-image: url(${Qr});
`;

export default Home;