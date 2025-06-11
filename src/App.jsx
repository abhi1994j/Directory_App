import { Route, Routes } from "react-router-dom";
import GetUser from "./Leaderboard/GetUser";
import AddUser from "./Leaderboard/AddUser";
import Navbar from "./Leaderboard/Navbar";

function App() {
  return (
    <>
      <h1 className={`text-center text-2xl italic bg-blue-300 py-2 text-white font-medium mb-4 w-full`}>
        Abhishek Chatterjee Directory App
      </h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddUser />} />
        <Route path="/retrieve" element={<GetUser />} />
      </Routes>
    </>
  );
}

export default App;
