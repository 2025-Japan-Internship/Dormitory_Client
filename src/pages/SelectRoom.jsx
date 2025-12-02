import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import './SelectRoom.css';

export default function SelectRoom() {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState("");
  const [name, setName] = useState("");

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

  const handleSelectRoom = async () => {
    if (!selectedRoom) return alert("호실을 선택해주세요");

    const { data, error } = await supabase
      .from("profiles") // 테이블 이름
      .upsert({
        user_id: supabase.auth.getUser()?.data?.user?.id,
        name: name,
        roomNum: selectedRoom
      }, { onConflict: "user_id" });

    if (error) {
      console.log("저장 실패:", error.message);
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="selectRoomContainer">
        <h1>호실 선택</h1>

        <div className="roomGrid">
            {Array.from({ length: 18 }, (_, i) => 401 + i).map((room) => (
            <div
                key={room}
                className={`roomCard ${selectedRoom === room ? 'selected' : ''}`}
                onClick={() => setSelectedRoom(room)}
            >
                {room}호
            </div>
            ))}
        </div>

        <button onClick={handleSelectRoom} className="saveButton">
            계속하기
        </button>
        {/*<button onClick={async () => {
            await supabase.auth.signOut();
            console.log("로그아웃 완료");
        }}>로그아웃</button>*/}
    </div>
  )
}
