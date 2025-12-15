import React from 'react';
import { Routes, Route } from 'react-router-dom';
// BrowserRouter 제거
import Song from './pages/Song';
import Home from './pages/Home';
import Meal from './pages/Meal';
import Login from "./pages/Login";
import SuggestionPage from './pages/SuggestionPage';
import SuggestionWritePage from './pages/SuggestionWritePage';
import NoticeList from "./pages/noticeList";
import NoticeDetail from "./pages/noticeDetail";
import SelectRoom from "./pages/SelectRoom";
import ScanQR from "./pages/scanQR";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/song" element={<Song />} />
      <Route path="/meal" element={<Meal />} />
      <Route path="/selectRoom" element={<SelectRoom />} />
      <Route path="/suggestion" element={<SuggestionPage />} />
      <Route path="/suggestion/write" element={<SuggestionWritePage />} />
      <Route path="/noticeList" element={<NoticeList />} />
      <Route path="/notices/:id" element={<NoticeDetail />} />
      <Route path="/scanQR" element={<ScanQR />} />
    </Routes>
  );
};

export default App;