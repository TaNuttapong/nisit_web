import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/login";
import AdminPage from "./pages/admin";
import NavbarCommon from "./common/NavbarCommon";
import FooterCommon from "./common/FooterCommon";
import { PathEnum } from "./enum/path.enum";

function App() {
  return (
    <>
      <NavbarCommon />
      <BrowserRouter>
        <Routes>
          <>
            <Route path={PathEnum.HOME} element={<HomePage />} />
            <Route path={PathEnum.LOGIN} element={<LoginPage />} />
            <Route path={PathEnum.ADMIN_PAGE} element={<AdminPage />} />
          </>
        </Routes>
      </BrowserRouter>
      <FooterCommon />
    </>
  );
}

export default App;
