import { Route, Routes } from "react-router-dom";
import GetUser from "./Leaderboard/GetUser";
import AddUser from "./Leaderboard/AddUser";
import Navbar from "./Leaderboard/Navbar";
import { useState } from "react";

function App() {
  const [people, setPeople] = useState(
    localStorage.getItem("peopleList")
      ? JSON.parse(localStorage.getItem("peopleList"))
      : []
  );
  return (
    <>
      <h1
        className={`text-center text-2xl italic bg-blue-300 py-2 text-white font-medium mb-4 w-full`}
      >
        Abhishek Chatterjee Directory App
      </h1>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<AddUser people={people} setPeople={setPeople} />}
        />
        <Route path="/retrieve" element={<GetUser people={people} />} />
      </Routes>
    </>
  );
}

export default App;
