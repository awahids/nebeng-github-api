import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../page/home/Home";
import UserDetail from "../page/user/User";

function RoutesLink() {
  return (
    // <Router>
    //   <Routes>
    //     <Route exact path="/" element={<Home />} />
    //     <Route exact path="/user-detail/:id" element={<UserDetail />} />
    //   </Routes>
    // </Router>

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
