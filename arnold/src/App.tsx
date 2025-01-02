import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Hero from "./components/hero";
import Signup from "./components/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Hero/>} />
        <Route path="signup" element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
