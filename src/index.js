import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Join from "./pages/Join";
import Vip from "./pages/Vip";
import Special from './pages/Special';





export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/vip" element={<Vip />} />
      <Route path="/join" element={<Join />} />

      <Route path="/special" element={<Special />} />

      
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);