import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Cover from "./pages/Cover";
import Components from "./pages/Components";
import FormRegister from "./pages/FormRegister";
import FormLogin from "./pages/FormLogin";
import FormFindID from "./pages/FormFindID";
import FormUserInfo from "./pages/FormUserInfo";
import FormArtistProfile from "./pages/FormArtistProfile";
import TableAudition from "./pages/TableAudition";
import FormWriteAudition from "./pages/FormWriteAudition";
import FormUpdateAudition from "./pages/FormUpdateAudition";
import ViewDetailAudition from "./pages/ViewDetailAudition";
import TableMyPost from "./pages/TableMyPost";
import TableArtist from "./pages/TableArtist";
import { useEffect } from "react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/components":
        title = "";
        metaDescription = "";
        break;
      case "/form-register":
        title = "";
        metaDescription = "";
        break;
      case "/form-login":
        title = "";
        metaDescription = "";
        break;
      case "/form-findid":
        title = "";
        metaDescription = "";
        break;
      case "/form-userinfo":
        title = "";
        metaDescription = "";
        break;
      case "/form-artistprofile":
        title = "";
        metaDescription = "";
        break;
      case "/table-audition":
        title = "";
        metaDescription = "";
        break;
      case "/form-writeaudition":
        title = "";
        metaDescription = "";
        break;
      case "/form-updateaudition":
        title = "";
        metaDescription = "";
        break;
      case "/view-detailaudition":
        title = "";
        metaDescription = "";
        break;
      case "/table-mypost":
        title = "";
        metaDescription = "";
        break;
      case "/table-artist":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Cover />} />

      <Route path="/components" element={<Components />} />

      <Route path="/form-register" element={<FormRegister />} />

      <Route path="/form-login" element={<FormLogin />} />

      <Route path="/form-findid" element={<FormFindID />} />

      <Route path="/form-userinfo" element={<FormUserInfo />} />

      <Route path="/form-artistprofile" element={<FormArtistProfile />} />

      <Route path="/table-audition" element={<TableAudition />} />

      <Route path="/form-writeaudition" element={<FormWriteAudition />} />

      <Route path="/form-updateaudition" element={<FormUpdateAudition />} />

      <Route path="/view-detailaudition" element={<ViewDetailAudition />} />

      <Route path="/table-mypost" element={<TableMyPost />} />

      <Route path="/table-artist" element={<TableArtist />} />
    </Routes>
  );
}
export default App;
