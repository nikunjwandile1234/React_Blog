import { useDispatch } from "react-redux";
import authservice from "../../appwrite/auth";
import { logout } from "../../Features/slice1";
import { useEffect } from "react";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    const logoutpromise = authservice.logout();
    logoutpromise
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        throw new Error(" logout not done successfully");
      });
  };

  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}
export default LogoutBtn;
