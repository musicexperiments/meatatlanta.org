import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Join from "./pages/Join";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Join />}>
        <Route index element={<Join />} />
        <Route path="join" element={<Join />} />
        <Route path="*" element={<Join />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);