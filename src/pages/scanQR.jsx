import { useEffect, useRef, useState } from "react";
import "./scanQR.css";
import { useNavigate } from "react-router-dom";
import jsQR from "jsqr";
import Icon_back from '../assets/icon_back.png';
import Qr from '../assets/qr.png';

export default function ScanQR() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDetected, setIsDetected] = useState(false); // QR 인식 여부 상태

  useEffect(() => {
    let animationFrameId;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // 카메라 시작 후 분석 루프 실행
          animationFrameId = requestAnimationFrame(tick);
        }
      } catch (err) {
        console.error("카메라 접근 오류:", err);
      }
    };

    const tick = () => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d", { willReadFrequently: true });

        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        
        // 카메라 프레임을 캔버스에 그림
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // 캔버스의 이미지 데이터를 가져와서 QR 분석
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code) {
          // QR이 인식되면 상태 변경
          console.log("Found QR code", code.data);
          setIsDetected(true);
        } else {
          setIsDetected(false);
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    startCamera();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCheckIn = () => {
    if (isDetected) {
      alert("입실이 완료되었습니다!");
      navigate("/home");
    } else {
      alert("QR 코드가 인식되지 않았습니다. 사각형 안에 맞춰주세요.");
    }
  };

  return (
    <div className="qr-page">
      <header className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src={Icon_back} alt="뒤로가기" />
        </button>
        <h1>입실 체크</h1>
      </header>

      <video ref={videoRef} playsInline autoPlay style={{ display: "none" }} />
      
      {/* 분석을 위한 캔버스 (카메라 배경 역할) */}
      <canvas ref={canvasRef} className="camera-background" />

      <div className="qr-container">
        <div className="scan-frame">
          <div className="corner corner-tl"></div>
          <div className="corner corner-tr"></div>
          <div className="corner corner-bl"></div>
          <div className="corner corner-br"></div>
          <div className="scan-line"></div>
        </div>
        <div className="floatingScanner">
          <div className="scannerIcon" style={{ backgroundImage: `url(${Qr})` }} onClick={handleCheckIn} />
        </div>
      </div>
    </div>
  );
}