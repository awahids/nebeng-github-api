import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import UserDetail from "../pages/user/User";

function RoutesLink() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-detail/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default RoutesLink;
