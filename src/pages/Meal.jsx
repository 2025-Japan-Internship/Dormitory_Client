import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import './Meal.css';
import Back from '../assets/back.png';

// 요일 정보: 0=일요일, 1=월요일, ... 6=토요일
const BASE_DAYS = [
  { day: 1, label: '월' },
  { day: 2, label: '화' },
  { day: 3, label: '수' },
  { day: 4, label: '목' },
  { day: 5, label: '금' },
  { day: 6, label: '토' },
  { day: 0, label: '일' }, // 일요일을 배열의 마지막에 배치 (한국식 주 시작: 월)
];

// 현재 날짜를 기준으로 요일 배열을 생성하고 'active' 상태를 설정하는 함수
const getDaysArray = (currentDate) => {
    const today = new Date();
    const currentDayOfWeek = (today.getDay() + 6) % 7; // 0=월, 1=화, ... 6=일
    
    return BASE_DAYS.map((dayItem, index) => {
        // 현재 날짜에서 선택된 요일로 이동하기 위한 일수 차이 계산
        const diff = index - currentDayOfWeek;
        
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + diff);

        const year = targetDate.getFullYear();
        const month = String(targetDate.getMonth() + 1).padStart(2, '0');
        const day = String(targetDate.getDate()).padStart(2, '0');
        const dateString = `${year}${month}${day}`;

        return {
            ...dayItem,
            dateString: dateString, // '20251202' 형태의 날짜 문자열
            dayNumber: targetDate.getDate(), // 날짜 숫자 (예: 2)
            active: dateString === currentDate, // 현재 선택된 날짜와 일치하는지 확인
        };
    });
};

const Meal = () => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 1. 현재 선택된 날짜 (YYYYMMDD 형식) 상태
  const today = new Date();
  const initialDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
  const [selectedDate, setSelectedDate] = useState(initialDate);
  
  // 2. 급식 정보를 가져오는 함수 (날짜를 인자로 받음)
  const fetchMeals = useCallback(async (dateString) => {
    setLoading(true);
    setMeals([]); // 로딩 시작 시 기존 데이터 초기화
    try {
      const API_KEY = "54bf68e058c145038edde0ea0e7e3ab2";
      const SCHOOL_CODE = "7011569";
      
      const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${API_KEY}&Type=json&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=${SCHOOL_CODE}&MLSV_YMD=${dateString}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.mealServiceDietInfo) {
        const mealList = data.mealServiceDietInfo[1].row.map(item => {
          const rawKcal = item.NTR_INFO ? item.NTR_INFO : '0';
          const kcalMatch = rawKcal.match(/(\d+\.?\d*)/); 
          const formattedKcal = kcalMatch ? `${kcalMatch[0]} Kcal` : "정보 없음";

          return {
            time: item.MMEAL_SC_NM, 
            kcal: formattedKcal, 
            menu: item.DDISH_NM.replace(/<br\/>/g, ', '),
          };
        });
        setMeals(mealList);
      } else {
        setMeals([]);
      }
    } catch (err) {
      console.error(err);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. selectedDate 상태가 변경될 때마다 급식 정보를 새로 불러옴
  useEffect(() => {
    fetchMeals(selectedDate);
  }, [selectedDate, fetchMeals]);

  // 요일 탭 데이터 생성
  const DAYS_ARRAY = getDaysArray(selectedDate);

  // 4. 요일 탭 클릭 핸들러
  const handleDayClick = (dateString) => {
    setSelectedDate(dateString);
  };

  return (
    <div className="container">
      <header className="header">
        <div
          className="backButton"
          onClick={() => navigate("/")}
          style={{ backgroundImage: `url(${Back})` }}
        />
        <h1 className="pageTitle">오늘의 급식</h1>
        <div className="placeholder" style={{ width: 24, height: 24 }} />
      </header>

      <div className="day-tabs-container">
        <div className="day-tabs-wrapper">
          {DAYS_ARRAY.map((dayItem) => (
            <div
              key={dayItem.dateString}
              className={`day-tab ${dayItem.active ? 'active' : 'inactive'}`}
              onClick={() => handleDayClick(dayItem.dateString)} // 클릭 핸들러 추가
            >
              {/* dayNumber로 날짜를 표시 */}
              <span className="day-number">{dayItem.dayNumber}</span>
              <span className="day-label">{dayItem.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="meal-list">
        {loading ? (
          <p>급식 정보를 불러오는 중...</p>
        ) : meals.length === 0 ? (
          <p>
            {/* 선택된 날짜를 'YYYY년 M월 D일' 형식으로 변환하여 표시 */}
            {`${selectedDate.substring(0, 4)}년 ${selectedDate.substring(4, 6)}월 ${selectedDate.substring(6, 8)}일`} 급식 정보가 없습니다.
          </p>
        ) : (
          meals.map((meal, index) => (
            <div key={index} className="meal-card">
              {/* 첫 번째 줄: 식사 이름 (중식/석식) */}
              <p className="meal-time-text">{meal.time}</p>

              {/* 두 번째 줄: 칼로리 정보 */}
              <p className="meal-kcal-text">{meal.kcal}</p>

              {/* 세 번째 줄: 식단 메뉴 */}
              <p className="meal-menu-text">
                {meal.menu}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Meal;