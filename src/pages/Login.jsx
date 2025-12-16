import React, { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import './Login.css';

export default function Login() {
  const navigate = useNavigate();

  // 이미 로그인 상태면 홈으로 바로 이동
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log("세션 있음");
        navigate("/home");
      }
    });

    // 로그인 상태 변동 시 자동 이동
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) navigate("/selectRoom");
    });

    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/Dormitory_Client/`
      }
    });

    if (error) console.log("로그인 실패:", error.message);
  };

  return (
    <div className="loginContainer">
      <div className="loginText">
        <h1>DOTORI</h1>
        <p>기숙사를 더 편안하고 편리하게</p>
      </div>
      <button onClick={loginWithGoogle} className="loginButton">
        <img src="/Dormitory_Client/google.svg" alt="google logo" />
        <span>구글로 시작하기</span>
      </button>
    </div>
  );
}