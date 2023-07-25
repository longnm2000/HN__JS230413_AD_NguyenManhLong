import { Route, Routes } from "react-router-dom";
import AddUserPage from "./components/AddUserPage";
import "bootstrap/dist/css/bootstrap.min.css";
import GamePage from "./components/GamePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AddUserPage />}></Route>
        <Route path="/game" element={<GamePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
