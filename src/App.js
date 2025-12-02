import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import SuggestionPage from './SuggestionPage';
import SuggestionWritePage from './SuggestionWritePage'; // 작성 페이지
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SuggestionPage />} />
        <Route path="/write" element={<SuggestionWritePage />} />
      </Routes>
    </Router>
  );
}

export default App;
