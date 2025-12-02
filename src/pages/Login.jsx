import React, { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // 이미 로그인 상태면 홈으로 바로 이동
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log("세션 있음, 로그아웃 후 테스트");
        supabase.auth.signOut(); // 테스트용 로그아웃
      }
    });

    // 로그인 상태 변동 시 자동 이동
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) navigate("/home");
    });

    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.log("로그인 실패:", error.message);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px" }}>
      <h1>로그인</h1>
      <button onClick={loginWithGoogle} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
        구글 계정으로 로그인
      </button>
    </div>
  );
}
