import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/login";
import AdminPage from "./pages/admin";
import NavbarCommon from "./common/NavbarCommon";
import FooterCommon from "./common/FooterCommon";

function App() {
  return (
    <>
      <NavbarCommon />
      <BrowserRouter>
        <Routes>
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/adminpage" element={<AdminPage />} />
          </>
        </Routes>
      </BrowserRouter>
      <FooterCommon />
    </>
  );
}

export default App;
