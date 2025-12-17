import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./SelectRoom.css";

export default function SelectRoom() {
  const navigate = useNavigate();
  const [selectedFloor, setSelectedFloor] = useState(4);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [name, setName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 유저 이름 가져오기
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      const user = session.user;
      const fullName = user.user_metadata?.full_name ?? "";
      const parsedName = fullName.includes("_")
        ? fullName.split("_")[1]
        : fullName;

      setName(parsedName);
    };

    getUser();
  }, []);

  // 🔹 드롭다운 외부 클릭 닫기 (디자인 로직 유지)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDropdownOpen && !e.target.closest(".dropdownContainer")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  const getRoomsForFloor = (floor) => {
    const start = floor * 100 + 1;
    return Array.from({ length: 18 }, (_, i) => start + i);
  };

  const rooms = getRoomsForFloor(selectedFloor);

  // 저장 로직은 main 기준
  const handleSelectRoom = async () => {
    if (!selectedRoom) {
      alert("호실을 선택해주세요");
      return; 
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      alert("로그인이 필요합니다");
      navigate("/login");
      return;
    }

    const user = session.user;

    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          user_id: user.id,
          name: name,
          roomNum: selectedRoom,
        },
        { onConflict: "user_id" }
      );

    if (error) {
      console.log("저장 실패:", error.message);
      alert("저장에 실패했습니다");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="selectRoomContainer">
      <h1>
        기숙사 호실을
        <br />
        선택해 주세요
      </h1>

      <div className="floorTabs">
        {[3, 4, 5].map((floor) => (
          <button
            key={floor}
            className={`floorTab ${
              selectedFloor === floor ? "active" : ""
            }`}
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
          <span>
            {selectedRoom
              ? `${selectedRoom}호`
              : "기숙사 호실을 선택해주세요."}
          </span>
          <span className="dropdownArrow">
            <img src="arrow.svg" alt="화살표" width="12" height="12" />
          </span>
        </div>

        {isDropdownOpen && (
          <div className="dropdownList">
            {rooms.map((room) => (
              <div
                key={room}
                className={`dropdownItem ${
                  selectedRoom === room ? "selected" : ""
                }`}
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

      {/* 로그아웃 버튼
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          console.log("로그아웃 완료");
          navigate("/login");
        }}
      >
        로그아웃
      </button> */}
    </div>
  );
}
