import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/login";
import AdminPage from "./pages/admin";
import FooterCommon from "./common/FooterCommon";
import { PathEnum } from "./enum/path.enum";
import SuperAdminPage from "./pages/super_admin";
import AddAccountPage from "./pages/add_account";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <>
            <Route path={PathEnum.HOME} element={<HomePage />} />
            <Route path={PathEnum.LOGIN} element={<LoginPage />} />
            <Route path={PathEnum.ADMIN_PAGE} element={<AdminPage />} />
            <Route
              path={PathEnum.SUPER_ADMIN_PAGE}
              element={<SuperAdminPage />}
            />
            <Route path={PathEnum.ADD_ACCOUNT} element={<AddAccountPage />} />
          </>
        </Routes>
      </BrowserRouter>
      <FooterCommon />
    </>
  );
}

export default App;
