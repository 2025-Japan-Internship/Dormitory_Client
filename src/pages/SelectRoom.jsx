import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import './SelectRoom.css';

export default function SelectRoom() {
  const navigate = useNavigate();
  const [selectedFloor, setSelectedFloor] = useState(4);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [name, setName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // 로그인 유저 정보 가져오기
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const fullName = user.user_metadata?.full_name ?? "";
        // 언더바 뒤쪽만 추출
        const parsedName = fullName.includes("_") ? fullName.split("_")[1] : fullName;
        setName(parsedName);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDropdownOpen && !e.target.closest('.dropdownContainer')) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  const getRoomsForFloor = (floor) => {
    const start = floor * 100 + 1;
    return Array.from({ length: 18 }, (_, i) => start + i);
  };

  const rooms = getRoomsForFloor(selectedFloor);

  const handleSelectRoom = async () => {
    if (!selectedRoom) {
      alert("호실을 선택해주세요");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert("로그인이 필요합니다");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .upsert({
          user_id: user.id,
          name: name,
          roomNum: selectedRoom
        }, { onConflict: "user_id" });

      if (error) {
        console.log("저장 실패:", error.message);
        alert("저장에 실패했습니다");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error("에러:", err);
      alert("오류가 발생했습니다");
    }
  };

  return (
    <div className="selectRoomContainer">
        <h1>기숙사 호실을<br/>선택해 주세요</h1>

        <div className="floorTabs">
            {[3, 4, 5].map((floor) => (
                <button
                    key={floor}
                    className={`floorTab ${selectedFloor === floor ? 'active' : ''}`}
                    onClick={() => {
                        setSelectedFloor(floor);
                        setSelectedRoom("");
                    }}
                >
                    {floor}층
                </button>
            ))}
        </div>

        <div className="dropdownContainer">
            <div 
                className="dropdownHeader" 
                onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(!isDropdownOpen);
                }}
            >
                <span>{selectedRoom ? `${selectedRoom}호` : "기숙사 호실을 선택해주세요."}</span>
                <span className="dropdownArrow">▼</span>
            </div>
            
            {isDropdownOpen && (
                <div className="dropdownList">
                    {rooms.map((room) => (
                        <div
                            key={room}
                            className={`dropdownItem ${selectedRoom === room ? 'selected' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRoom(room);
                                setIsDropdownOpen(false);
                            }}
                        >
                            {room}호
                        </div>
                    ))}
                </div>
            )}
        </div>

        <button onClick={handleSelectRoom} className="saveButton">
            선택하기
        </button>
    </div>
  );
}