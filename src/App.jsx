import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
// BrowserRouter 대신 HashRouter 사용

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/song" element={<Song />} />
        <Route path="/meal" element={<Meal />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/selectRoom" element={<SelectRoom />} />
        <Route path="/suggestion" element={<SuggestionPage />} />
        <Route path="/suggestion/write" element={<SuggestionWritePage />} />
        <Route path="/noticeList" element={<NoticeList />} />
        <Route path="/notices/:id" element={<NoticeDetail />} />
        <Route path="/scanQR" element={<ScanQR />} />
      </Routes>
    </HashRouter>
  );
};

export default App;