import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Create from "./components/Create";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  );
};

export default App;
