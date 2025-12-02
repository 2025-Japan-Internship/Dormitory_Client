import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

import Bell from '../assets/bell.png';
import Profile from '../assets/profile.png';
import Food from '../assets/food.png';
import Post from '../assets/post.png';
import Suggest from '../assets/suggest.png';
import Morning from '../assets/morning.png';
import Arrow from '../assets/arrow.png';
import Qr from '../assets/qr.png';
import noticeData from '../data/notice.json';

 

import './Home.css'



export function getTimeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now - past) / 1000); // 초 단위 차이

  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}


const COLORS = {
  primary: '#4CAF50',
  secondary: '#333333',
  lightText: '#666666',
  background: '#f8f8f8',
  cardGreen: '#2ec757',
  cardLightGreen: '#90df99',
};



const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const processedSongRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [musicList, setMusicList] = useState([]);
  const [nameOnly, setNameOnly] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [sliderCards, setSliderCards] = useState([]);

  const newSong = location.state?.newSong;

  const [meal, setMeal] = useState({ time: "오늘", menu: "불러오는 중..." });
  const API_KEY = "54bf68e058c145038edde0ea0e7e3ab2";
  const SCHOOL_CODE = "7011569";

  useEffect(() => {
    const sortedCards = [...noticeData]
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // 최신순
      .slice(0, 10) // 최신 10개만
      .map((n, idx) => ({
        type: idx === 0 ? 'main' : 'sub',
        time: getTimeAgo(n.date),
        userName: n.name || '관리자',     // 공지마다 사감 이름
        profileImage: n.profile || Profile, // 공지마다 사감 프로필
        phone: n.phone || '010-0000-0000',
        title: n.title,
        active: idx === 0,
        id: n.id,
      }));
    setSliderCards(sortedCards);
  }, []);

  useEffect(() => {
    if (newSong && processedSongRef.current !== newSong) {
      processedSongRef.current = newSong;
      setMusicList(prev => [...prev, newSong]);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [newSong, navigate, location.pathname]);

  // Supabase 유저 정보 가져오기
  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const fullName = user.user_metadata?.full_name ?? "";
        const parsedName = fullName.includes("_") ? fullName.split("_")[1] : fullName;
        setNameOnly(parsedName);

        const profilePic = user.identities?.[0]?.identity_data?.picture || user.user_metadata?.avatar_url || "";
        setProfileImage(profilePic);
      }
    };

    loadUser();
  }, []);

  //기상송 목록
  useEffect(() => {
    const fetchSongs = async () => {
      const { data, error } = await supabase
        .from('songs')          // 테이블 이름
        .select('*')            // 모든 컬럼
        .order('created_at', { ascending: false }); // 최신 순

      if (error) {
        console.error("곡 불러오기 실패:", error);
      } else {
        // 홈에서 바로 보여줄 musicList로 설정
        setMusicList(data.map(song => ({
          title: song.title,
          artist: song.artist,
          imgUrl: song.img_url || "https://placehold.co/300x300?text=No+Image"
        })));
      }
    };

    fetchSongs();
  }, []);

  //시간에 맞는 급식 불러오기
  useEffect(() => {
    const fetchMeal = async () => {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const dateString = `${yyyy}${mm}${dd}`;

      const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${API_KEY}&Type=json&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=${SCHOOL_CODE}&MLSV_YMD=${dateString}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        // 데이터가 있으면 첫 번째 급식 정보 사용
        if (data.mealServiceDietInfo) {
          const mealData = data.mealServiceDietInfo[1].row[0];
          setMeal({
            time: mealData.MMEAL_SC_NM || "오늘", // 조식/중식/석식
            menu: mealData.DDISH_NM.replace(/\d+\./g, "").replace(/<br\/>/g, ", "),
          });
        } else {
          setMeal({ time: "오늘", menu: "급식 정보가 없습니다." });
        }
      } catch (error) {
        console.error("급식 API 오류:", error);
        setMeal({ time: "오늘", menu: "급식 정보를 가져올 수 없습니다." });
      }
    };

    fetchMeal();
  }, []);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const scrollLeft = slider.scrollLeft;
    const slideWidth = 267 + 12; 
    const index = Math.round(scrollLeft / slideWidth);
    setActiveIndex(index);
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="headerment">
          <p className="titleName">{nameOnly}님,</p>
          <p className="greeting">오늘 하루도 힘내세요</p>
        </div>
        <div className="headerIcons">
          <img src={Bell} alt="bell" className="notificationBell" />
          <img src={profileImage || Profile} alt="Profile" className="profileCircle" referrerPolicy="no-referrer"/>
        </div>
      </header>

    {/* Slider Section */}
    <section className="sliderSection">
      <div className="sliderWrapper" ref={sliderRef} onScroll={handleScroll}>
        {sliderCards.map((card, index) => (
        <div
          className={`sliderCard ${index === activeIndex ? 'active' : ''}`}
          key={index}
        >
          <p className="timeAgo">{card.time}</p>
          <div className="userInfo">
            <img src={card.profileImage || Profile} className="userAvatar" alt="user avatar" />
            <div className="userText">
              <p className="userName">{card.userName} 사감쌤</p>
              <p className="userPhone">{card.phone}</p>
            </div>
          </div>
          <div className="cardTitle">
            <span className="cardTitleText">{card.title}</span>
            <span
              className="arrowIcon"
              onClick={() => navigate(`/notices/${card.id}`)}
              style={{ cursor: 'pointer' }}
            >
              〉
            </span>
          </div>
        </div>
      ))}

      </div>
      {/* 하단 점(dot) 표시 (최대 4개) */}
      <div className="paginationDots">
        {sliderCards.slice(0, 4).map((_, index) => {
          // 마지막 dot인지 확인
          const isLastDot = index === 3 && sliderCards.length > 4;
          // 현재 activeIndex에 맞춰 색상 결정
          const isActive = isLastDot ? activeIndex >= 3 : index === activeIndex;

          return <span key={index} className={`dot ${isActive ? 'active' : ''}`} />;
        })}
      </div>
    </section>


      {/* Navigation Icons */}
      <nav className="navIcons">
        <div className="navItem" onClick={() => navigate("/meal")}>
          <div className="iconWrapper">
            <div className="foodimg" style={{ backgroundImage: `url(${Food})` }} />
          </div>
          <p className="iconLabel">급식</p>
        </div>

        <div className="navItem" onClick={() => navigate("/noticeList")}>
          <div className="iconWrapper">
            <div className="postimg" style={{ backgroundImage: `url(${Post})` }} />
          </div>
          <p className="iconLabel">공지사항</p>
        </div>

        <div className="navItem" onClick={() => navigate("/suggestion")}>
          <div className="iconWrapper">
            <div className="suggestimg" style={{ backgroundImage: `url(${Suggest})` }} />
          </div>
          <p className="iconLabel">건의사항</p>
        </div>

        <div className="navItem" onClick={() => navigate("/song")}>
          <div className="iconWrapper">
            <div className="morningimg" style={{ backgroundImage: `url(${Morning})` }} />
          </div>
          <p className="iconLabel">기상송</p>
        </div>
      </nav>

      {/* Meal Section */}
      <div className="bottemSections">
        <section className="mealSection">
          <div className="sectionHeader">
            <p className="sectionTitle">오늘의 급식</p>
            <div
              className="moreArrow"
              style={{ backgroundImage: `url(${Arrow})` }}
              onClick={() => navigate("/meal")}
            />
          </div>
          <div className="mealCard">
            <div className="mealTimeSection">
              <p className="timeText">{meal.time}</p>
              <span className="todayBadge">오늘</span>
            </div>
            <p className="menuText">{meal.menu}</p>
          </div>
        </section>

        {/* Music Section */}
        <section className="musicSection">
        <p className="sectionTitle">오늘의 기상송</p>
          <div className="musicList">
            {musicList.map((music, idx) => (
              <div className="musicCard" key={idx}>
                <div className="albumArt" style={{ backgroundImage: `url(${music.imgUrl})` }} />
                <p className="songTitle">{music.title}</p>
                <p className="artist">{music.artist}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* Floating Scanner */}
      <div className="floatingScanner">
        <div className="scannerIcon" 
          style={{ backgroundImage: `url(${Qr})` }} 
          onClick={() => navigate(`/scanQR`)}
        />
      </div>
    </div>
  );
};

export default Home;
