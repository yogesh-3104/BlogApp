import { useEffect, useState } from "react";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Header, Footer } from "./component/index";
import { Outlet } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
 
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout())
        }
      })
      .catch((error) => {
        console.log("Error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  return !isLoading ? (
    <div className="flex justify-center  min-h-screen w-screen bg-gray-500 px-6 py-4">
      <div className="max-w-md mx-auto w-full flex items-center flex-col">
        <Header />
        <main>TODO: <Outlet/></main>
        <h1>Blog App with Appwrite</h1>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
