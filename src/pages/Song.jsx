import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Back from '../assets/back.png';
import './Song.css';

async function fetchAlbumArt(title, artist) {
  const query = encodeURIComponent(`${artist} ${title}`);
  const url = `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
          return data.results[0].artworkUrl100.replace("100x100", "300x300");
      }
      return null;
  } catch (error) {
      console.error("iTunes API 오류:", error);
      return null;
  }
}

function Song(){
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!songTitle || !songArtist) {
        alert("제목과 가수를 모두 입력하세요!");
        return;
    }

    const albumImg = await fetchAlbumArt(songTitle, songArtist);

    navigate("/", {
        state: {
          newSong: {
            title: songTitle,
            artist: songArtist,
            imgUrl: albumImg || "https://placehold.co/300x300?text=No+Image"
          }
        }
    });
};

  return (
    <div className="screenContainer">
      <header className="header">
        <div
          className="backButton"
          onClick={() => navigate("/")}
          style={{ backgroundImage: `url(${Back})` }}
        />
        <h1 className="pageTitle">기상송 신청</h1>
      </header>

      <main className="contentArea">
        <div className="inputGroup">
          <p className="inputLabel1">기상송 제목작성</p>
          <p className="inputLabel2">원하는 기상송의 제목을 작성해 주세요</p>
          <input
            className="textInput"
            type="text"
            placeholder="제목 작성"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
          />
        </div>

        <div className="inputGroup">
          <p className="inputLabel1">기상송 가수작성</p>
          <p className="inputLabel2">원하는 기상송의 가수을 작성해 주세요</p>
          <input
            className="textInput"
            type="text"
            placeholder="가수 작성"
            value={songArtist}
            onChange={(e) => setSongArtist(e.target.value)}
          />
        </div>
      </main>

      <footer className="footer">
        <button className="submitButton" onClick={handleSubmit}>
          신청하기
        </button>
      </footer>
    </div>
  );
};

export default Song;
