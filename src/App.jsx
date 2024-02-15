import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import authService from "./appwrite/auth";
import { login, logout } from "./Store/authSlice";
import { Outlet } from "react-router-dom";
import { Loader } from "./Components";

function App() {
  const [loading, setLoading] = useState(true);

  const Dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        Dispatch(login({ userData }));
        setLoading(false);
      } else {
        Dispatch(logout());
        setLoading(false);
      }
    });
  }, []);

  return (
    <main>
      <Header />

      {!loading ? <Outlet /> : <Loader />}

      <Footer />
    </main>
  );
}

export default App;
