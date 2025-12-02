import { useEffect, useRef } from "react";
import "./scanQR.css";
import { useNavigate } from "react-router-dom";
import Icon_back from '../assets/icon_back.png';
import Qr from '../assets/qr.png';

export default function ScanQR() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    // 카메라 스트림 시작
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" } // 후면 카메라
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("카메라 접근 오류:", err);
      }
    };

    startCamera();

    // 컴포넌트 언마운트 시 카메라 정리
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="qr-page">
      {/* 헤더 */}
      <header className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src={Icon_back} alt="뒤로가기" />
        </button>

        <h1>입실 체크</h1>
      </header>

      {/* 카메라 배경 */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="camera-background"
      />

      {/* 블러 오버레이 */}
      <div className="blur-overlay"></div>

      {/* QR 스캔 영역 */}
      <div className="qr-container">
        <div className="scan-frame">
          <div className="corner corner-tl"></div>
          <div className="corner corner-tr"></div>
          <div className="corner corner-bl"></div>
          <div className="corner corner-br"></div>
          <div className="scan-line"></div>
        </div>
        <p className="scan-text">QR 코드를 스캔 영역에 맞춰주세요</p>
        <div className="floatingScanner">
          <div className="scannerIcon" style={{ backgroundImage: `url(${Qr})` }} />
        </div>
      </div>
    </div>
  );
}