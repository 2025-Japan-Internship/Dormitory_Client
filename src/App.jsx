
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Song from './pages/Song';
//import Meal from './pages/Meal';
//import Test from './pages/Test';
import Login from "./pages/Login";
import Home from './pages/Home';
import SuggestionPage from './pages/SuggestionPage';
import SuggestionWritePage from './pages/SuggestionWritePage'; // 작성 페이지
import NoticeList from "./pages/noticeList";
import NoticeDetail from "./pages/noticeDetail";
import noticedata from "./data/notice.json";


const App = () => {
  return (
      <Routes>
        <Route path="/song" element={<Song />} />
        {/*<Route path="/Meal" element={<Meal />} />
        <Route path="/test" element={<Test />} />*/}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/suggestion" element={<SuggestionPage />} />
        <Route path="/suggestion/write" element={<SuggestionWritePage />} />
        <Route path="/noticeList" element={<NoticeList />} />
        <Route path="/notices/:id" element={<NoticeDetail />} />
      </Routes>
  );
};

export default App; 
