import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LogInPage from "pages/LoginPage";
import MainPage from "pages/MainPage";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<MainPage userObj={userObj} />} />
          </>
        ) : (
          <Route exact path="/" element={<LogInPage />} />
        )}
      </Routes>
    </Router>
  );
};
export default AppRouter;
