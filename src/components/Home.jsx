import Game from "./Game";
import Main from "./Main";
import Result from "./Result";
import Setup from "./Setup";
import { Route, Routes } from "react-router-dom";

const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/setup" element={<Setup/>} />
      <Route path="/game" element={<Game/>} />
      <Route path="/result" element={<Result/>} />
    </Routes>
  );
};

export default Home;
