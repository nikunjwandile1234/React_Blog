import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./Features/slice1";
import authservice from "./appwrite/auth";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authservice
      .getCurrentuser()
      .then((userData) => {
        if (userData) {
          dispatch(
            login({
              $id: userData.$id,
              email: userData.email,
              name: userData.name,
            })
          );
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

 
  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-400">
      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;